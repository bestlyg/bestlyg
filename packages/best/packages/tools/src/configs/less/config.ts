import { resolve } from '../..//utils';
import { LessConfig } from './interface';
import LessAutoprefix from 'less-plugin-autoprefix';
import NpmImportPlugin from 'less-plugin-npm-import';
import LessPluginFunctions from 'less-plugin-functions';

const npmImport = new NpmImportPlugin({ prefix: '~' });
const autoprefix = new LessAutoprefix();
const lessPluginFunctions = new LessPluginFunctions();
export const config: LessConfig = {
    paths: ['node_modules', resolve('node_modules')],
    plugins: [npmImport, autoprefix, lessPluginFunctions],
    javascriptEnabled: true,
};
