import util from 'util';
import React from 'react';
import { baseDefines } from '../scripts/utils';
import { set } from 'lodash';

for (const [k, v] of Object.entries(baseDefines)) {
    set(globalThis, k, v);
}

console.log('JEST setup');
if (window) {
    // (window as any).React = React;
}
// eslint-disable-next-line no-console
console.log('Current React Version:', React.version);
