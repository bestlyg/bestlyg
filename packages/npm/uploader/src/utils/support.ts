type LegacyBlobPrototype = Blob & {
        webkitSlice?: Blob['slice'];
        mozSlice?: Blob['slice'];
};

type LegacyBlobConstructor = {
    prototype: LegacyBlobPrototype;
    new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

/**
 * 支持chunked方式上传
 */
export function supportChunked(): boolean {
    const BlobCtor = (window.Blob ||
        (window as typeof window & { WebKitBlob?: LegacyBlobConstructor }).WebKitBlob) as
        | LegacyBlobConstructor
        | undefined;
    if (!BlobCtor) return false;
    try {
        const blobPrototype = BlobCtor.prototype;
        return Boolean(
            FormData &&
                (typeof blobPrototype.slice === 'function' ||
                    typeof blobPrototype.webkitSlice === 'function' ||
                    typeof blobPrototype.mozSlice === 'function'),
        );
    } catch (_err) {
        return false;
    }
}

/**
 * 支持xhr上传的方式
 */
export function supportXhr(): boolean {
    return Boolean(window.FormData || (window.ProgressEvent && window.FileReader));
}

export function supportCrc32() {
    const blobPrototype = Blob.prototype as LegacyBlobPrototype;
    return Boolean(
        typeof Int32Array !== 'undefined' &&
            'readAsBinaryString' in window.FileReader.prototype &&
            (typeof blobPrototype.slice === 'function' ||
                typeof blobPrototype.webkitSlice === 'function' ||
                typeof blobPrototype.mozSlice === 'function'),
    );
}
