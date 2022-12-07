import { LOGO, fs, resolve } from './utils';
import { execSync } from 'child_process';

main();
function main() {
  console.log(LOGO);
  execSync('pnpm --filter blog run build', { stdio: 'inherit' });
  fs.copySync(resolve('./packages/blog/dist'), resolve('./static/web'));
}
