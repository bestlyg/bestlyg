import { execFile, execSync } from 'child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const run = async cmd => execSync(cmd, { stdio: 'inherit' });
const CWD = process.cwd();
function resolve(...p) {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.resolve(dirname, ...new Array(1).fill('..'), ...p);
}

const sqlFileName = `best_data.sql`;
run(`git remote add gitee https://github.com/bestlyg/bestlyg.git`);
run(`git remote add github https://github.com/bestlyg/bestlyg.git`);
run(`git config --global user.email "bestlyg@foxmail.com"`);
run(`git config --global user.name bestlyg`);
run(
    `scp root@106.54.220.193:/root/${sqlFileName} ${resolve('databases', 'bestlyg-data', sqlFileName)}`,
);
run(
    `scp root@106.54.220.193:/root/bestlyg/packages/common/.env ${resolve('packages', 'common', '.env')}`,
);
