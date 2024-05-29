import { Command } from 'commander';
import { CWD, packageInfo } from './utils/constants';
import { print } from './utils/print';
import { ToolOption, chinaSoftwareCopyrightExtractionTool } from './core';

const contact = (v, cur) => cur.concat([v]);

async function main() {
    const program = new Command();
    program.name(packageInfo.name);
    program.description(packageInfo.description);
    program.version(packageInfo.version);
    program
        .option('--output-path <output_path>', 'The output path..', CWD)
        .option('--glob-path <glob_path>', 'The source code path.', contact, [])
        .option('--ignore-path <ignore_path>', 'The ignore path.', contact, [])
        .action(async (o: ToolOption) => {
            console.log(o);
            await chinaSoftwareCopyrightExtractionTool(o);
        });
    program.parse();
}

main().catch(err => {
    print.errorWithStack('Run cli error.', err);
    process.exit(1);
});
