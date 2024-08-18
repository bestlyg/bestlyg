import { Command } from 'commander';

export function build(program: Command) {
    program.command('build').action(async () => {});
}
