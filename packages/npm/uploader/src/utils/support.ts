/**
 * 支持chunked方式上传
 */
export function supportChunked(): boolean {
    const Blob = window.Blob || (window as any).WebKitBlob;
    try {
        const blobpro = Blob.prototype;
        return !!(FormData && (blobpro.slice || blobpro.webkitSlice || blobpro.mozSlice));
    } catch (_err) {
        return false;
    }
}

/**
 * 支持xhr上传的方式
 */
export function supportXhr(): boolean {
    return !!(!!window.FormData || (window.ProgressEvent && window.FileReader));
}

export function supportCrc32() {
    const supportBinaryString = window.FileReader && window.FileReader.prototype.readAsBinaryString;
    const blobPrototype = Blob.prototype as Record<string, any>;
    return (
        typeof Int32Array !== 'undefined' &&
        supportBinaryString &&
        (blobPrototype.slice || blobPrototype.webkitSlice || blobPrototype.mozSlice)
    );
}
