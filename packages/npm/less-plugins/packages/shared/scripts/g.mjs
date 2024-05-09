import 'zx/globals';

// pnpm zx scripts/g.mjs --package_name get-current-package-scope

const packagePath = path.resolve(__dirname, '..', '..');

const templatePath = path.resolve(packagePath, 'template');

const packageName = argv['package_name'];

if (!packageName) {
    echo`PackageName is required.`;
    process.exit(1);
}

const files = await glob('**/*.*', {
    cwd: templatePath,
    ignore: ['lib', 'node_modules', 'CHANGELOG.md'],
});

await Promise.all(
    files.map(async file => {
        const oldFilePath = path.resolve(packagePath, templatePath, file);
        const newFilePath = path.resolve(packagePath, packageName, file);
        await fs.ensureDir(path.dirname(newFilePath));
        const fileData = (await fs.readFile(oldFilePath)).toString();
        await fs.writeFile(newFilePath, fileData.replaceAll('template', packageName));
    })
);
