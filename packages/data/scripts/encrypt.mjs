#!/usr/bin/env node
import '@bestlyg/cli/globals';
import { getFiles, encryptData, decryptPath, resolve, encryptPath } from './utils.mjs';

const files = await getFiles(decryptPath);

await Promise.all(
    files.map(async file => {
        const fileData = await fs.readFile(resolve(decryptPath, file), 'utf8');
        await fs.ensureDir(path.dirname(resolve(encryptPath, file)));
        await fs.writeFile(resolve(encryptPath, file), encryptData(fileData));
    })
);

best.utils.print.success('Encrypt data success.');
