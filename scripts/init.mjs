import { execFile, execSync } from 'child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const run = cmd => {
    try {
        console.log(`\n\n==>[${cmd}]`)
        execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
        console.log(`\n\n==>Error [${cmd}]`)
        console.error(err);
    }
};
const CWD = process.cwd();
function resolve(...p) {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.resolve(dirname, ...new Array(1).fill('..'), ...p);
}

const sqlFileName = `best_data.sql`;
run(`git remote add gitee https://gitee.com/bestlyg/bestlyg.git`);
run(`git remote add github https://github.com/bestlyg/bestlyg.git`);
run(`git config --global user.email "bestlyg@foxmail.com"`);
run(`git config --global user.name bestlyg`);
run(`git pull origin master`)
// run(
//     `scp root@106.54.220.193:/root/best_data.sql ${resolve('databases', 'bestlyg-data', `best_data.sql`)}`,
// );
// run(
//     `scp root@106.54.220.193:/root/bestlyg/packages/common/.env ${resolve('packages', 'common', '.env')}`,
// );
const dumpSql = `psql -U root -d best_data -h localhost -p 5432 < /bestlyg-data/best_data.sql`;
run(dumpSql);
run(`docker exec bestlyg-postgres sh -c "${dumpSql}`);
