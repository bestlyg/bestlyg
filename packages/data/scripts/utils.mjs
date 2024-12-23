import '@bestlyg/cli/globals';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import os from 'node:os';

best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

const key = crypto
    .createHash('sha256')
    .update(String(process.env.BESTLYG_SECRET))
    .digest('base64')
    .substring(0, 32);

/**
 * @param {string} content
 */
export function encryptData(content) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
    return (cipher.update(content, 'utf8', 'hex') + cipher.final('hex')).toString('hex');
}

/**
 * @param {string} content
 */
export function decryptData(content) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
    return (decipher.update(content, 'hex', 'utf8') + decipher.final('utf8')).toString('utf8');
}

/**
 * @param  {...string} p
 */
export function resolve(...p) {
    return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ...p);
}

export const decryptPath = resolve('src');

export const encryptPath = resolve('encrypt-src');

export async function getFiles(cwd) {
    let filePath = path.join('**', '*.*');
    if (os.platform() === 'win32') filePath = glob.convertPathToPattern(filePath);
    return glob(filePath, { cwd });
}

export const CHAR_SPLIT = '\n';
