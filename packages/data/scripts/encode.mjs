#!/usr/bin/env node
import '@bestlyg/cli/globals';
import { getFiles, resolve } from './utils.mjs';

dotenv.config({
    path: resolve('.env.local'),
});

console.log(utils.CWD, process.env.BESTLYG_DATACODE_SECRET);

const files = await getFiles();

console.log(files);
