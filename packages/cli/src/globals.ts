import 'zx/globals';
import * as best from './index';

best.dotenv.config({ path: path.resolve(best.utils.CWD, '.env') });

Object.assign(globalThis, best);

declare global {
    var _: typeof best._;
    var R: typeof best.R;
    var figlet: typeof best.figlet;
    var z: typeof best.z;
    var yargs: typeof best.yargs;
    var commander: typeof best.commander;
    var Cli: typeof best.Cli;
    var utils: typeof best.utils;
    var semver: typeof best.semver;
    var inquirer: typeof best.inquirer;
    var rimraf: typeof best.rimraf;
    var manypkg: typeof best.manypkg;
    var dotenv: typeof best.dotenv;
}
