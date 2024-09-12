#!/usr/bin/env node
import '@bestlyg/cli/globals';
import { getFiles, decryptData, encryptPath, resolve, decryptPath, CHAR_SPLIT } from './utils.mjs';

const files = await getFiles(encryptPath);

await Promise.all(
    files.map(async file => {
        const fileData = await fs.readFile(resolve(encryptPath, file), 'utf8');
        await fs.ensureDir(path.dirname(resolve(decryptPath, file)));
        await fs.writeFile(
            resolve(decryptPath, file),
            fileData.split(CHAR_SPLIT).map(decryptData).join(CHAR_SPLIT),
        );
    }),
);

best.utils.print.success('Decrypt data success.');
