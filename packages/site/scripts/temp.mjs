import 'zx/globals';

const dirpath = path.join(__dirname, '..', 'blog', '**', '*.md');
const files = await glob(dirpath.replace(/\\/g, '/'));
console.log(files);
await Promise.all(
    files.map(async file => {
        const data = (await fs.readFile(file)).toString();
        await fs.remove(file);
        await fs.writeFile(file + 'x', data);
    })
);
