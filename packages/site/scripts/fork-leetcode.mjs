import 'zx/globals';
import { leetcodePath } from './utils.mjs';

await fs.remove(leetcodePath);

await fs.copy(
    path.join(__dirname, '..', 'node_modules', '@bestlyg', 'leetcode', 'dist'),
    leetcodePath
);
