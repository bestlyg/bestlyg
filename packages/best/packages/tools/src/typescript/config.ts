import ts from 'typescript';
import { TsConfig } from './interface';

export const config: TsConfig = {
    baseUrl: '.',
    target: ts.ScriptTarget.ESNext,
    useDefineForClassFields: false,
    experimentalDecorators: true,
    resolveJsonModule: true,
    esModuleInterop: true,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: true,
    module: ts.ModuleKind.CommonJS,
    paths: {
        '@/*': ['src/*'],
    },
    types: ['node'],
};
