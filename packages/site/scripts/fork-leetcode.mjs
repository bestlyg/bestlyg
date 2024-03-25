import 'zx/globals';

await fs.remove(path.join(__dirname, '..', 'docs', 'leetcode'));

await fs.copy(
    path.join(__dirname, '..', 'node_modules', '@bestlyg', 'leetcode', 'dist'),
    path.join(__dirname, '..', 'docs', 'leetcode')
);