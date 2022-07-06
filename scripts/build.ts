import { shelljs, LOGO } from './utils';

main();
function main() {
  console.log(LOGO);
  shelljs.exec('pnpm --filter server run build');
  shelljs.exec('pnpm --filter client run build');
}
