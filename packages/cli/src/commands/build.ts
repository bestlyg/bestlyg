import { Command } from 'commander';
import { CWD, packageInfo, resolve } from '@/utils/index';

export function build(program: Command) {
    program.command('build').action(async () => {});
}
