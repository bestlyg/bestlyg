import { TsConfig } from './interface';
import { CWD, DIR_NAME_ESM, resolve } from '../../utils';

export const config: TsConfig | Record<string, any> = {
    target: 'esnext',
    esModuleInterop: true,
    module: 'es6',
    declaration: true,
    moduleResolution: 'node',
    outDir: resolve(CWD, DIR_NAME_ESM),
    jsx: 'react-jsx',
    excludeDirectories: [resolve(CWD, 'src/style')],
    p: resolve(CWD, 'tsconfig.json'),
};
