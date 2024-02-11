import { Command } from 'commander';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageInfo } from './utils/constants.js';
import { print } from './utils/print.js';
import { loadCommands, resolve } from './utils/functions.js';

async function main() {
    const program = new Command();
    program.name(packageInfo.name);
    program.description(packageInfo.description);
    program.version(packageInfo.version);
    await loadCommands({
        commandDirs: [resolve(path.dirname(fileURLToPath(import.meta.url)), 'command')],
        filterFn: async filePath => path.extname(filePath) === '.js',
        program
    });
    program.parse();
}

try {
    await main();
} catch (err) {
    print.errorWithStack('Run cli error.', err);
    process.exit(1);
}
