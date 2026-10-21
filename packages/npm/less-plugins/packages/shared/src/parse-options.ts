import yargs from 'yargs/yargs';

export function parseOptions(options: string) {
    return yargs(options).parseSync();
}
