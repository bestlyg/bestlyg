#!/usr/bin/env node
'use strict';
const module = await import('../dist/esm/cli.js');
const cli = new module.Cli();
await cli.run();
