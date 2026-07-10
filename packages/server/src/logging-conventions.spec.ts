import fs from 'node:fs';
import path from 'node:path';

const serverRoot = path.resolve(__dirname, '..');
const runtimeRoots = [path.join(serverRoot, 'src'), path.join(serverRoot, 'libs')];
const directConsolePattern = /\bconsole\.(log|warn|error|info|debug)\b/;

function collectSourceFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (['dist', 'node_modules', 'coverage'].includes(entry.name)) return [];
            return collectSourceFiles(fullPath);
        }
        if (!entry.name.endsWith('.ts')) return [];
        if (entry.name.endsWith('.spec.ts')) return [];
        return [fullPath];
    });
}

describe('server logging conventions', () => {
    it('routes runtime logs through Nest Logger instead of direct console calls', () => {
        const offenders = runtimeRoots
            .flatMap(collectSourceFiles)
            .filter((file) => directConsolePattern.test(fs.readFileSync(file, 'utf8')))
            .map((file) => path.relative(serverRoot, file));

        expect(offenders).toEqual([]);
    });
});
