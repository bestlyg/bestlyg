import * as R from 'ramda';
import { SPACE_PER_TAB } from './constants';

export function replaceTabsToSpace(code: string) {
    return code.replace(/\t/g, ' '.repeat(SPACE_PER_TAB));
}
export function replaceWindowsCRLFToUnix(code: string) {
    return code.replace(/\r\n/g, '\n');
}
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
    replaceTabsToSpace,
    replaceWindowsCRLFToUnix,
    removeEndLine,
    removeSingleLineComments,
    removeMultiLineComments,
    removeEmptyLine
);

export const formatCSCode = R.pipe(
    replaceTabsToSpace,
    replaceWindowsCRLFToUnix,
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
            return formatJSCode(code);
        case '.cs':
            return formatCSCode(code);
        default:
            return code;
    }
}