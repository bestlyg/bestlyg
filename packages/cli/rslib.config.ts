import { createLibraryConfig } from '../../scripts/rslib-config';

export default createLibraryConfig({
    entry: { index: './src/index.ts', globals: './src/globals.ts' },
});
