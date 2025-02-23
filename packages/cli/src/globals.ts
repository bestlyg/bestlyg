import 'zx/globals';
import globalInjectData from './index';

globalInjectData.dotenv.config({ path: path.resolve(globalInjectData.common.CWD, '.env') });

Object.assign(globalThis, { best: globalInjectData });

declare global {
    var best: typeof globalInjectData;
}
