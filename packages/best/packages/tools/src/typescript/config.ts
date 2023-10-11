import ts from 'typescript';
import { TsConfig } from './interface';

export const config: TsConfig | Record<string, any> = {
    target: 'esnext',
    esModuleInterop: true,
    module: 'es6',
    declaration: true,
    moduleResolution: 'node',
    outDir: './es',
};
