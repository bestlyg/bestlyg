import { SyncSliceHash, SyncHash } from './hash';
import { request, Response } from './request';
import { AsyncQueue } from './async-queue';
import { getFileData } from './functions';

export class Store {
    data = new FormData();
    append(key: string, value: Blob) {
        this.data.append(key, value);
    }
    get(key: string) {
        return this.data.get(key);
    }
    getAll(key: string) {
        return this.data.getAll(key);
    }
    delete(key: string) {
        return this.data.delete(key);
    }
    toFormData() {
        return this.data;
    }
    entries() {
        return Array.from(this.data.entries()) as unknown as [string, File][];
    }
    clear() {
        for (const key of this.data.keys()) {
            this.data.delete(key);
        }
    }
}
export type OnProgress = (data: { loaded: number; total: number }) => void;
export type UploadOptions = { url: string; files: File[] };
export abstract class Uploader {
    onProgressSet = new Set<OnProgress>();
    abstract upload(options: UploadOptions): Promise<void>;
    addOnProgress(fn: OnProgress): void {
        this.onProgressSet.add(fn);
    }
    deleteOnProgress(fn: OnProgress): void {
        this.onProgressSet.delete(fn);
    }
    clear() {
        this.onProgressSet.clear();
    }
}
export class SingleUploader extends Uploader {
    store: Store | null = new Store();
    upload({ url, files, index = 0 }: UploadOptions & { index?: number }): Promise<void> {
        const file = files[index];
        this.store.append('file', file);
        return request({
            url,
            method: 'post',
            body: this.store.toFormData(),
            beforeSend: xhr => {
                xhr.upload.onprogress = e => {
                    const data = { loaded: e.loaded, total: e.total };
                    this.onProgressSet.forEach(fn => fn(data));
                };
            },
        }).then();
    }
}

export abstract class SliceUploader extends Uploader {
    constructor(public window: number = 10) {
        super();
    }
}
export class SingleSliceUploader extends SliceUploader {
    asyncQueue: AsyncQueue = new AsyncQueue(this.window);
    upload({
        url,
        files,
        index = 0,
        chunkSize = 2 * 1024 * 1024,
    }: UploadOptions & {
        chunkSize?: number;
        index?: number;
    }): Promise<void> {
        const file = files[index];
        const filedata = getFileData(file);
        const total = file.size;
        let loaded = 0;
        let finishedCount = 0;
        let sumCount = 0;
        return new Promise((resolve, reject) => {
            for (let pos = 0; pos < file.size; pos += chunkSize) {
                sumCount += 1;
                const idx = sumCount;
                this.asyncQueue.push(() => {
                    const slice = file.slice(pos, pos + chunkSize);
                    const store = new Store();
                    store.append('slice', slice);
                    const hashCstr = new SyncHash();
                    return request({
                        url: `/api/upload/single/exist?idx=${idx}`,
                        method: 'get',
                        headers: {
                            'x-uploader-dirname': filedata.name,
                            'x-uploader-filename': filedata.name,
                            'x-uploader-ext': filedata.ext,
                            'x-uploader-chunksize': chunkSize + '',
                            'x-uploader-index': idx + '',
                        },
                    })
                        .then(res => {
                            if (res.data.success === 0) {
                                return hashCstr.hash(slice).then(hash => {
                                    return request({
                                        url,
                                        method: 'post',
                                        headers: {
                                            'x-uploader-dirname': filedata.name,
                                            'x-uploader-filename': filedata.name,
                                            'x-uploader-ext': filedata.ext,
                                            'x-uploader-chunksize': chunkSize + '',
                                            'x-uploader-index': idx + '',
                                            'x-uploader-hash': hash + '',
                                        },
                                        body: store.toFormData(),
                                    }) as any;
                                });
                            } else {
                                return Promise.resolve();
                            }
                        })
                        .then(() => {
                            loaded += slice.size;
                            const data = { loaded, total };
                            this.onProgressSet.forEach(fn => fn(data));
                            finishedCount += 1;
                            // console.log(
                            //     `finished ${idx}, sum = ${sumCount}, finishedCount = ${finishedCount}`
                            // );
                            if (finishedCount === sumCount) resolve();
                        }, reject);
                });
            }
        });
    }
}
