import * as R from 'ramda';
import { SPACE_PER_TAB } from './constants';

/** 转换Tab到空格 */
export function replaceTabsToSpace(code: string) {
    return code.replace(/\t/g, ' '.repeat(SPACE_PER_TAB));
}
/** 转换window的换行到unix */
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

export const formatCCode = R.pipe(
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
        case '.cs':
        case '.c':
        case '.cpp':
        case '.cc':
        case '.java':
            return formatCCode(code);
        default:
            return code;
    }
}
