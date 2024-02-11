import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'node:path';

export function resolve(...p: string[]) {
    return path.resolve(path.dirname(import.meta.url), '../..', ...p);
}

export function getEnv(s: string) {
    return process.env[`BEST_CLI_${s}`];
}

export async function loadCommands({
    program,
    commandDirs,
    filterFn = () => true
}: {
    program: Command;
    commandDirs: string[];
    filterFn?: (filePath: string) => boolean | Promise<boolean>;
}) {
    const files = (
        await Promise.all(
            commandDirs.map(async commandDir => {
                const files = await fs.readdir(commandDir);
                return files.map(p => resolve(commandDir, p));
            })
        )
    ).flat();
    const modules = (
        await Promise.all(
            files.map(async file => {
                const flag = await filterFn(file);
                const module = flag ? await import(file) : null;
                return [module, flag] as [{ default: Function }, boolean];
            })
        )
    )
        .filter(([, flag]) => flag)
        .map(([module]) => module);
    for (const mod of modules) {
        const fn = mod.default;
        fn(program);
    }
}

export function mount<O, T>(base: O, mountRecord: T) {
    const result = base as O & T;
    for (const [k, v] of Object.entries(mountRecord)) {
        result[k] = v;
    }
    return result;
}
