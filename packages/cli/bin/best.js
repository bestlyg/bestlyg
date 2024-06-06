#!/usr/bin/env node
'use strict';

// const [major, minor, patch] = process.version
//     .slice(1)
//     .split('.')
//     .map(v => Number(v));
// console.log(major, minor, patch);
// if (major >= 20) {
import('../dist/esm/index.js').then(({ Cli }) => new Cli().run());
// } else {
//     new require('../dist/lib/index.cjs').Cli().run();
// }
