#!/usr/bin/env node
import '@bestlyg/cli/globals';
import { getFiles, encryptData, decryptPath, resolve, encryptPath, CHAR_SPLIT } from './utils.mjs';

const files = await getFiles(decryptPath);

await Promise.all(
    files.map(async file => {
        const fileData = await fs.readFile(resolve(decryptPath, file), 'utf8');
        await fs.ensureDir(path.dirname(resolve(encryptPath, file)));
        await fs.writeFile(
            resolve(encryptPath, file),
            fileData.split(CHAR_SPLIT).map(encryptData).join(CHAR_SPLIT),
        );
    }),
);

best.utils.print.success('Encrypt data success.');
