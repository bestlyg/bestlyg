import { DIRECT_UPLOAD_LIMIT } from './constant';

/**
 * 获取文件切片
 * @returns
 */
export function fileSlice(file: Blob, start: number, end: number) {
    if (typeof file.slice === 'function') return file.slice(start, end);
    const legacyFile = file as Blob & { webkitSlice?: Blob['slice']; mozSlice?: Blob['slice'] };
    if (typeof legacyFile.webkitSlice === 'function') return legacyFile.webkitSlice(start, end);
    if (typeof legacyFile.mozSlice === 'function') return legacyFile.mozSlice(start, end);
    throw new Error('Blob slice is not supported');
}

/**
 * 获取文件后缀
 */
export function getFileSuffix(fileName: string) {
    if (!fileName || Object.prototype.toString.call(fileName) !== '[object String]') {
        return null;
    }
    const pos = fileName.lastIndexOf('.');
    if (pos > 0) {
        const suffix = `.${fileName.substring(pos + 1)}`;
        // 最大扩展名
        if (suffix.length <= 8) {
            return suffix;
        }
    }
    return null;
}

/**
 * 获取文件切割策略，切割步长
 */
export function getFileSliceLength(
    file: Blob,
    getSliceFunc: (size: number) => number | undefined,
): number {
    const { size } = file;
    const byted = 1024 * 1024;
    if (getSliceFunc && typeof getSliceFunc === 'function') {
        const sliceLength = getSliceFunc(size);
        // 当分片大小小于2m时，按2m分片处理
        if (sliceLength !== undefined && sliceLength < DIRECT_UPLOAD_LIMIT) {
            return DIRECT_UPLOAD_LIMIT;
        }
        return sliceLength || size;
    }
    if (size > 200 * byted) {
        return 10 * byted;
    } else if (size <= 200 * byted && size >= 2 * byted) {
        return 5 * byted;
    }
    return file.size;
}
