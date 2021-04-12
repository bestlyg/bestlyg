import { lernaConfig, semver, enquirer, chalk, fs, args, resolve } from './utils';

const currentVersion = lernaConfig.version;
const preId =
  args.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)?.[0]);
const versionIncrements: semver.ReleaseType[] = [
  'major',
  'minor',
  'patch',
  ...((preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []) as semver.ReleaseType[]),
];
const inc = (i: semver.ReleaseType) => semver.inc(currentVersion, i, preId);
async function main() {
  const { release } = (await enquirer.prompt({
    type: 'select',
    name: 'release',
    message: '选择下一版本',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`),
  })) as { release: string };
  const targetVersion = release.match(/\((.*)\)/)![1];
  console.log(chalk.blue(`下一版本 : ${targetVersion}`));
  lernaConfig.version = targetVersion;
  fs.writeFileSync(resolve('package.json'), JSON.stringify(lernaConfig, null, 2) + '\n');
}
main();
