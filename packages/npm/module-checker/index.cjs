const path = require('path');

exports.isCJS = function isCJS() {
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
};

exports.isESM = function isESM() {
    return !isCJS();
};
