import { Command } from 'commander';
import { LOGO, packageInfo, print } from './utils/index';
import { build } from './commands/index';

export class Cli {
    private _program = new Command();
    get program() {
        return this._program;
    }
    private _helpers = {
        contact: (v, cur) => cur.concat([v]),
    };
    get helpers() {
        return this._helpers;
    }
    constructor() {
        this.program.name(packageInfo.name);
        this.program.description(packageInfo.description);
        this.program.version(packageInfo.version);
        this.apply(build);
        this.program.action(o => {
            print.success('Cli started.');
        });
    }
    apply(fn: (program: Command) => void) {
        fn(this.program);
        return this;
    }
    async run() {
        try {
            console.log(LOGO);
            this.program.parse();
        } catch (err) {
            print.errorWithStack('Run cli error.', err);
            process.exit(1);
        }
    }
}
