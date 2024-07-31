#!/usr/bin/env node
import '@bestlyg/cli/globals';
import { getFiles, decryptData, encryptPath, resolve, decryptPath } from './utils.mjs';

const files = await getFiles(encryptPath);

await Promise.all(
    files.map(async file => {
        const fileData = await fs.readFile(resolve(encryptPath, file), 'utf8');
        await fs.ensureDir(path.dirname(resolve(decryptPath, file)));
        await fs.writeFile(resolve(decryptPath, file), decryptData(fileData));
    })
);

utils.print.success('Decrypt data success.');
