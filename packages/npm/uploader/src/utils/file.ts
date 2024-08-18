import { DIRECT_UPLOAD_LIMIT } from './constant';

/**
 * 获取文件切片
 * @returns
 */
export function fileSlice(file: Blob, start: number, end: number) {
    const slice: (typeof Blob)['prototype']['slice'] =
        file.slice || (file as any).webkitSlice || (file as any).mozSlice;
    return slice.call(file, start, end);
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
        // 当分片大小小于2m时，按2m分片处理
        if (getSliceFunc(size) < DIRECT_UPLOAD_LIMIT) {
            return DIRECT_UPLOAD_LIMIT;
        }
        return getSliceFunc(size) || size;
    }
    if (size > 200 * byted) {
        return 10 * byted;
    } else if (size <= 200 * byted && size >= 2 * byted) {
        return 5 * byted;
    }
    return file.size;
}
