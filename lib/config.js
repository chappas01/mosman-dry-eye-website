// ===== Runtime configuration =====
// Reads optional config.json in the project root and environment variables,
// and persists generated secrets to the data dir so that login tokens stay
// valid across server restarts. No external dependencies.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as store from './store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load config.json if the clinic created one (all fields optional).
let fileConfig = {};
const configPath = path.join(__dirname, '..', 'config.json');
try {
    if (fs.existsSync(configPath)) {
        fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
} catch (err) {
    console.error('[config] config.json is not valid JSON, ignoring it:', err.message);
}

function pick(envKey, fileKey, fallback) {
    if (process.env[envKey] !== undefined) return process.env[envKey];
    if (fileConfig[fileKey] !== undefined) return fileConfig[fileKey];
    return fallback;
}

// --- Persistent secrets ---------------------------------------------------
// Generate strong secrets once and store them, so restarts don't fall back
// to a well-known hardcoded key. (Reserved for future authenticated areas.)
let secrets = store.read('.secrets', null);
if (!secrets || !secrets.jwt || !secrets.jwtTemp) {
    secrets = {
        jwt: crypto.randomBytes(48).toString('hex'),
        jwtTemp: crypto.randomBytes(48).toString('hex'),
        createdAt: new Date().toISOString(),
    };
    store.write('.secrets', secrets);
    console.log('[config] Generated new server secrets (data/.secrets.json)');
}

// --- Feature flags --------------------------------------------------------
const requireTwoFactorRaw = pick('REQUIRE_2FA', 'require2FA', false);
const REQUIRE_2FA = requireTwoFactorRaw === true || requireTwoFactorRaw === 'true';

const config = {
    PORT: parseInt(pick('PORT', 'port', 3000), 10),
    NODE_ENV: pick('NODE_ENV', 'nodeEnv', 'development'),
    JWT_SECRET: process.env.JWT_SECRET || secrets.jwt,
    JWT_TEMP_SECRET: process.env.JWT_TEMP_SECRET || secrets.jwtTemp,
    REQUIRE_2FA,
    CLINIC_NAME: pick('CLINIC_NAME', 'clinicName', 'Mosman Dry Eye Clinic'),
};

export default config;
