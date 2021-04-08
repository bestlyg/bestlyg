import { args, shelljs, chalk, shell } from './utils';

const scriptStr = args.scripts || args.s;
enum Tag {
  GIT = 'Git',
}
interface Script {
  script: string;
  silent: boolean;
}
async function main() {
  if (!scriptStr) return;
  const scripts = (scriptStr as string).split('__').map<Script>(script => {
    for (const tag of Object.values(Tag)) {
      if (script.endsWith(tag)) {
        return {
          script: shell.git[script.substr(0, script.length - tag.length)],
          silent: true,
        };
      }
    }
    return { script: `yarn ${script}`, silent: false };
  });
  for (const { script, silent } of scripts) {
    console.log(chalk.blue(`当前执行脚本：【${script}】`));
    const res = shelljs.exec(script, { silent });
    if (res.code === 0) {
      console.log(chalk.green('执行成功'));
    } else {
      console.log(chalk.red(res.stderr));
      break;
    }
  }
}
main();
