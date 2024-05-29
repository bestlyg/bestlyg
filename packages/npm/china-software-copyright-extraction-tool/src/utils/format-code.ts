import * as R from 'ramda';

/** 删除文件尾部换行 */
export function removeEndLine(code: string) {
    return code.replace(/\n$/, '');
}
/** 删除单行注释 */
export function removeSingleLineComments(code: string) {
    return code.replace(/\/\/.*/g, '');
}
/** 删除多行注释 */
export function removeMultiLineComments(code: string) {
    return code.replace(/\/\*{2}[\s\S]*?\*\//g, '');
}

/** 删除空白行 */
export function removeEmptyLine(code: string) {
    return code.replace(/^\s*(?=\r?$)\n/gms, '');
}

export const formatJSCode = R.pipe(
    removeEndLine,
    removeSingleLineComments,
    removeMultiLineComments,
    removeEmptyLine
);

export function formatCode(code: string, fileExt: string) {
    switch (fileExt) {
        case '.js':
        case '.cjs':
        case '.mjs':
        case '.ts':
        case '.cts':
        case '.mts':
            const result = formatJSCode(code);
            // print.info('Source Code: ');
            // print.info(code);
            // print.info('Formatted Code: ');
            // print.info(result);
            return result;
        default:
            return code;
    }
}
