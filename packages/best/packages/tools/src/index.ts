import { resolve, packageInfo, error } from './utils';
import { Command } from 'commander';
import fs from 'fs-extra';

const program = new Command();
program.name(packageInfo.name).description(packageInfo.description).version(packageInfo.version);

program
    .command('clean')
    .description('Clean directory.')
    .option('-d --directory <dir>', 'Work directory.', process.cwd())
    .action(o => {
        console.log(o);
        const dirs = ['es', 'dist', 'lib'];
        for (const dir of dirs) {
            fs.remove(resolve(o.d, dir));
        }
    });

program
    .command('build')
    .description('Build a libray.')
    .option('--entry <entry>', 'Entry file.', resolve(process.cwd(), 'index.js'))
    .option('--type <type>', 'Build type es/dist/lib.', 'es')
    .action((o, options) => {
        switch (o.type) {
            case 'es':
                console.log('es');
                break;
            case 'dist':
                console.log('dist');
                break;
            case 'lib':
                console.log('lib');
                break;
            default:
                error(`Unkown type ${o.type}`);
        }
    });

program.parse();
