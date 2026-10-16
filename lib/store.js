// ===== Simple, dependency-free JSON data store =====
// Persists collections to disk so data survives server restarts and is
// shared by every PC that connects to this server. Uses atomic writes
// (write to a temp file, then rename) so a crash mid-write cannot corrupt
// the live data file. No native modules => installs cleanly on Windows.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');

function ensureDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function fileFor(name) {
    // Only allow safe names (optional leading dot for internal files;
    // no slashes or dots elsewhere, so path traversal is impossible).
    if (!/^\.?[a-zA-Z0-9_-]+$/.test(name)) {
        throw new Error(`Invalid collection name: ${name}`);
    }
    return path.join(DATA_DIR, `${name}.json`);
}

// Read a JSON value from disk. Returns `fallback` if the file does not exist.
function read(name, fallback) {
    ensureDir();
    const file = fileFor(name);
    if (!fs.existsSync(file)) return fallback;
    try {
        const raw = fs.readFileSync(file, 'utf8');
        return raw.trim() ? JSON.parse(raw) : fallback;
    } catch (err) {
        console.error(`[store] Could not read ${name}.json:`, err.message);
        // Preserve the corrupt file for investigation rather than losing it.
        try { fs.copyFileSync(file, `${file}.corrupt-${Date.now()}`); } catch (_) {}
        return fallback;
    }
}

// Atomically write a JSON value to disk.
function write(name, value) {
    ensureDir();
    const file = fileFor(name);
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(value, null, 2), 'utf8');
    fs.renameSync(tmp, file); // atomic on the same filesystem
    return value;
}

// Convenience helpers for array-shaped collections.
function readCollection(name) {
    const v = read(name, []);
    return Array.isArray(v) ? v : [];
}

function writeCollection(name, arr) {
    return write(name, Array.isArray(arr) ? arr : []);
}

export { DATA_DIR, read, write, readCollection, writeCollection };
