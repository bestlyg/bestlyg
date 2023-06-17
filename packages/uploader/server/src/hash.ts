import { crc32 } from './crc32';

export class Hash {
    hash(blob: Blob): Promise<any> {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return new Promise((resolve, reject) => {
            const onload: any = (e: any) => {
                resolve(e.target.result);
            };
            const onerror: any = (e: any) => {
                reject(e);
            };
            reader.onload(onload);
            reader.onerror(onerror);
        }).then((arrayBuffer: ArrayBuffer) => {
            return crc32(arrayBuffer, 0);
        });
    }
}

export class SyncHash extends Hash {
    hash(file: Blob): Promise<number> {
        return super.hash(file);
    }
}

export class SyncSliceHash extends Hash {
    hash(blob: Blob, sliceCount: number = 2, chunkSize: number = 2 * 1024 * 1024): Promise<number> {
        const chunks: Blob[] = [];
        for (let pos = 0; pos < chunkSize; pos += chunkSize) {
            const [l, m, r] = [pos, pos + Math.floor(chunkSize / 2), pos + chunkSize - sliceCount];
            chunks.push(blob.slice(l, l + sliceCount));
            chunks.push(blob.slice(m, m + sliceCount));
            chunks.push(blob.slice(r, r + sliceCount));
        }
        return super.hash(new Blob(chunks));
    }
}
