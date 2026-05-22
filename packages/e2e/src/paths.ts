import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));

function resolvePackageRoot() {
    if (path.basename(SRC_DIR) === 'shared' && path.basename(path.dirname(SRC_DIR)) === 'dist') {
        return path.resolve(SRC_DIR, '../..');
    }

    if (path.basename(SRC_DIR) === 'dist') {
        return path.resolve(SRC_DIR, '..');
    }

    return path.resolve(SRC_DIR, '..');
}

export const PACKAGE_ROOT = resolvePackageRoot();
export const PROJECTS_ROOT = path.resolve(PACKAGE_ROOT, 'projects');
export const PLAYWRIGHT_CONFIG_PATH = path.resolve(PACKAGE_ROOT, 'playwright.config.ts');
