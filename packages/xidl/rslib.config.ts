import { createLibraryConfig } from '../../scripts/rslib-config';

export default createLibraryConfig({
    entry: {
        index: './src/index.ts',
        cli: './src/cli.ts',
        'plugins/index': './src/plugins/index.ts',
    },
});
