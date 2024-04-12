import 'zx/globals';
import getReleasePlane from '@changesets/get-release-plan';
import { getPackages } from '@manypkg/get-packages';

echo`${JSON.stringify(argv)}`;

await $`pnpm changeset`;

const CWD = $.cwd ?? process.cwd();
const CHANGELOG_NAME = 'CHANGELOG.md';

const { packages } = await getPackages(CWD);

console.log(packages);

const plane = await getReleasePlane(CWD);

console.log(JSON.stringify(plane, null, 4));

for (let i = 0; i < plane.releases.length; i++) {
    const { name, newVersion, changesets } = plane.releases[i];
    const pkgInfo = packages.find(item => item.packageJson.name === name);
    const changelogPath = path.join(pkgInfo.dir, CHANGELOG_NAME);
    const changelogList = [];
    changelogList.push(`## ${newVersion}`);
    for (const changsetId of changesets) {
        changelogList.push(`- ${plane.changesets.find(item => item.id === changsetId).summary}`);
    }
    pkgInfo.packageJson.version = newVersion;
    await fs.writeFile(
        path.join(pkgInfo.dir, 'package.json'),
        JSON.stringify(pkgInfo.packageJson, null, 4)
    );
    for (let j = 0; j < i; j += 1) {
        const { name: depName, newVersion } = plane.releases[j];
        for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
            if (pkgInfo.packageJson?.[depType]?.[depName]) {
                changelogList.push(`- Update ${depType} ${depName}@${newVersion}`);
            }
        }
    }
    changelogList.push(``);
    const oldChangeLogData = (await fs.readFile(changelogPath)).toString();
    await fs.writeFile(changelogPath, changelogList.join('\n\n') + oldChangeLogData);

    await within(async () => {
        cd(pkgInfo.dir);
        await $`pnpm publish --registry https://registry.npmjs.org --access=public --no-git-checks`;
    });
}

await Promise.all(
    plane.changesets.map(changeset => fs.remove(path.join(CWD, '.changeset', `${changeset.id}.md`)))
);
