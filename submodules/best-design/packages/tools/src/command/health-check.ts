import { Command } from 'commander';
import { print } from '../utils/print.js';

export default function (program: Command) {
    print.success('Health check is connected.');
    program
        .command(`health-check`)
        .description(`Health check.`)
        .action(() => {
            print.success('Health check success.');
        });
}
