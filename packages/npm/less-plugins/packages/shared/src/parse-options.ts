import yargs from 'yargs';

export function parseOptions(options: string) {
    return yargs(options).parse();
}
