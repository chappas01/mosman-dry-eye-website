// ===== MOSMAN DRY EYE — WEBSITE SERVER (merged frontend + backend) =====
// Serves the built React app (dist/) and the public clinic APIs:
//   POST /api/booking   — consultation requests  -> data/bookings.json
//   POST /api/contact   — contact form messages  -> data/messages.json
//   GET  /health        — uptime probe
// Adapted from the PMS server (mosman-dry-eye-pms) — auth/PMS routes remain
// in that repo; this server is the public website + lead capture only.

import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import cors from 'cors';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { body, validationResult } from 'express-validator';
import config from './lib/config.js';
import * as store from './lib/store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = config.PORT;
const DIST_DIR = path.join(__dirname, 'dist');

// ===== SECURITY MIDDLEWARE =====

// 1. Helmet — CSP tuned for the pre-built Vite app (Google Fonts only externals)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "blob:"],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            workerSrc: ["'self'"],
            frameAncestors: ["'none'"],
        },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    referrerPolicy: { policy: 'same-origin' },
}));

// 2. CORS — the React dev server (Vite :5173) hits the API during development
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://mosmandreyeclinic.com.au', 'https://www.mosmandreyeclinic.com.au']
        : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
}));

// 3. Compression + body parsing
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// ===== RATE LIMITING =====

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
});

const bookingLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        error: 'Too many booking attempts. Please try again later or call us directly.',
        contact: '(02) 9968 1247',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
});

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: { success: false, error: 'Too many contact form submissions. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 500,
    maxDelayMs: 20000,
});

app.use(globalLimiter);
app.use(speedLimiter);

// ===== HTTPS REDIRECT (production, behind a proxy) =====
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
        return res.redirect(301, `https://${req.get('Host')}${req.url}`);
    }
    next();
});

// ===== HELPERS =====

const SUSPICIOUS_PATTERNS = [
    [/script.*>/i, 'Script injection'],
    [/javascript:/i, 'JavaScript protocol'],
    [/on\w+\s*=/i, 'Event handlers'],
    [/<iframe/i, 'Iframe injection'],
    [/document\.cookie/i, 'Cookie access'],
];

function detectSuspiciousContent(data) {
    const dataString = JSON.stringify(data);
    const hits = [];
    for (const [pattern, name] of SUSPICIOUS_PATTERNS) {
        if (pattern.test(dataString)) hits.push(name);
    }
    return hits;
}

function nextId(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

// ===== API ROUTES =====

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// Consultation request -> validated, persisted to data/bookings.json
app.post('/api/booking',
    bookingLimiter,
    [
        body('firstName').trim().isLength({ min: 1, max: 50 }).escape(),
        body('lastName').optional({ values: 'falsy' }).trim().isLength({ max: 50 }).escape(),
        body('email').isEmail().normalizeEmail().isLength({ max: 254 }),
        // Optional: must look like an AU number if provided (mobile or landline)
        body('phone').optional({ values: 'falsy' }).trim()
            .matches(/^(\+?61|0)[2-478](\s?\d){8}$/).withMessage('Please provide a valid Australian phone number'),
        body('preferredDate').optional({ values: 'falsy' }).isISO8601().toDate(),
        body('preferredTime').optional({ values: 'falsy' }).trim().isLength({ max: 20 }).escape(),
        body('patientType').optional({ values: 'falsy' }).trim().isIn(['new', 'returning']),
        body('appointmentType').optional({ values: 'falsy' }).trim().isLength({ max: 100 }).escape(),
        body('symptoms').optional({ values: 'falsy' }).trim().isLength({ max: 2000 }).escape(),
    ],
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid input data',
                    details: errors.array().map(e => e.msg),
                });
            }

            const b = req.body;
            const suspicious = detectSuspiciousContent(b);
            if (suspicious.length > 0) {
                console.warn('🚨 Suspicious booking attempt:', suspicious.join(', '));
                return res.status(400).json({ success: false, error: 'Invalid booking data detected' });
            }

            const booking = {
                id: nextId('bkg'),
                receivedAt: new Date().toISOString(),
                status: 'new',
                firstName: b.firstName,
                lastName: b.lastName || '',
                email: b.email,
                phone: b.phone || '',
                patientType: b.patientType || 'new',
                appointmentType: b.appointmentType || (b.patientType === 'returning' ? 'Returning patient review' : 'Initial consultation (90 min)'),
                preferredDate: b.preferredDate || null,
                preferredTime: b.preferredTime || '',
                symptoms: b.symptoms || '',
                source: 'website',
            };

            const bookings = store.readCollection('bookings');
            bookings.push(booking);
            store.writeCollection('bookings', bookings);

            console.log(`✅ Booking saved: ${booking.id} — ${booking.firstName} ${booking.lastName} <${booking.email}> pref ${booking.preferredDate || 'any'} ${booking.preferredTime}`);

            res.status(201).json({
                success: true,
                message: 'Booking request received successfully',
                bookingId: booking.id,
                timestamp: booking.receivedAt,
            });
        } catch (error) {
            console.error('Booking error:', error);
            res.status(500).json({ success: false, error: 'Internal server error. Please try again or contact us directly.' });
        }
    }
);

// Contact message -> validated, persisted to data/messages.json
app.post('/api/contact',
    contactLimiter,
    [
        body('name').trim().isLength({ min: 2, max: 100 }).escape(),
        body('email').isEmail().normalizeEmail(),
        body('message').trim().isLength({ min: 10, max: 1000 }).escape(),
    ],
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, error: 'Invalid contact form data', details: errors.array().map(e => e.msg) });
            }

            const suspicious = detectSuspiciousContent(req.body);
            if (suspicious.length > 0) {
                console.warn('🚨 Suspicious contact attempt:', suspicious.join(', '));
                return res.status(400).json({ success: false, error: 'Invalid message detected' });
            }

            const message = {
                id: nextId('msg'),
                receivedAt: new Date().toISOString(),
                status: 'new',
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
                source: 'website',
            };

            const messages = store.readCollection('messages');
            messages.push(message);
            store.writeCollection('messages', messages);

            console.log(`📧 Contact message saved: ${message.id} from ${message.email}`);

            res.status(201).json({
                success: true,
                message: 'Contact form submitted successfully. We will respond within 24 hours.',
            });
        } catch (error) {
            console.error('Contact error:', error);
            res.status(500).json({ success: false, error: 'Internal server error. Please try again later.' });
        }
    }
);

// ===== STATIC FRONTEND (built React app) =====

if (fs.existsSync(DIST_DIR)) {
    app.use(express.static(DIST_DIR, {
        maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
        setHeaders: (res, filePath) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            // hashed assets can cache long; index.html must always revalidate
            if (filePath.endsWith('.html')) {
                res.setHeader('Cache-Control', 'no-store, must-revalidate');
            } else if (/\.[0-9a-f]{8,}\.(js|css|woff2?|png|jpe?g|webp|avif|svg)$/i.test(filePath)) {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
        },
    }));

    // SPA fallback: any non-API GET serves the app shell
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) return next();
        res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
} else {
    console.warn('⚠️  dist/ not found — run `npm run build` first. API routes still active.');
}

// ===== ERROR HANDLING =====

app.use((req, res) => {
    res.status(404).json({ error: 'Not found', requestedUrl: req.originalUrl });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    const isDevelopment = process.env.NODE_ENV !== 'production';
    res.status(err.status || 500).json({
        error: isDevelopment ? err.message : 'Internal server error',
        ...(isDevelopment && { stack: err.stack }),
    });
});

// ===== STARTUP =====

app.listen(PORT, '127.0.0.1', () => {
    console.log(`🌐 Mosman Dry Eye website server on http://localhost:${PORT}`);
    console.log(`   API:  POST /api/booking · POST /api/contact · GET /health`);
    console.log(`   Data: ${store.DATA_DIR}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => { console.log('🛑 Shutting down'); process.exit(0); });
process.on('SIGINT', () => { console.log('🛑 Shutting down'); process.exit(0); });
