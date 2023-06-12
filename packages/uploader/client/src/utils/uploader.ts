import { request, Response } from './request';

export class Store {
    data = new FormData();
    append(key: string, value: File) {
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
    abstract upload(options: UploadOptions): Promise<Response>;
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
    upload({ url, files, index = 0 }: UploadOptions & { index?: number }): Promise<Response> {
        this.store.append('file', files[index]);
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
        });
    }
}

export abstract class SliceUploader extends Uploader {
    window = 10;
    total = 10;
    sliceSize = 1024 * 1024 * 30;
}
export class SingleSliceUploader extends Uploader {
    store: Store | null = new Store();
    upload({ url, files, index = 0 }: UploadOptions & { index?: number }): Promise<Response> {
        this.store.append('file', files[index]);
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
        });
    }
}
