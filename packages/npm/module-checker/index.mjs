import path from 'path';

export function isCJS() {
    return (
        typeof module !== 'undefined' &&
        typeof require !== 'undefined' &&
        typeof __dirname !== 'undefined' &&
        typeof __filename !== 'undefined' &&
        typeof exports !== 'undefined' &&
        module.exports === exports &&
        module.filename === __filename &&
        path.dirname(module.filename) === __dirname
    );
}

export function isESM() {
    return !isCJS();
}
