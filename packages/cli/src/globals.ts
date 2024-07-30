import 'zx/globals';
import * as best from './index';

best.dotenv.config({ path: path.resolve(best.utils.CWD, '.env') });

Object.assign(globalThis, best);

declare global {
    var utils: typeof best.utils;
    var z: typeof best.z;
    var doctrine: typeof best.doctrine;
    var AdmZip: typeof best.AdmZip;
    var cheerio: typeof best.cheerio;
    var ts: typeof best.ts;
    var lodash: typeof best.lodash;
    var ramda: typeof best.ramda;
    var figletx: typeof best.figletx;
    var yargs: typeof best.yargs;
    var semver: typeof best.semver;
    var inquirer: typeof best.inquirer;
    var minimist: typeof best.minimist;
    var dotenv: typeof best.dotenv;
    var dayjs: typeof best.dayjs;
    var axios: typeof best.axios;
    var manypkg: typeof best.manypkg;
    var changeCase: typeof best.changeCase;
    var rimraf: typeof best.rimraf;
    var commander: typeof best.commander;
    var jsdom: typeof best.jsdom;
}
