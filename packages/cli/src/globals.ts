import 'zx/globals';
import { _best as globalInjectData } from './index';

globalInjectData.dotenv.config({ path: path.resolve(globalInjectData.common.CWD, '.env') });

Object.assign(globalThis, { best: globalInjectData });

declare global {
    var best: typeof globalInjectData;
}
