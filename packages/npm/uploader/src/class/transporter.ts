import { noop } from '@/utils';
import tapable from 'tapable';

export interface TransporterSendConfig {
    url: string;
    method?:
        | 'get'
        | 'post'
        | 'patch'
        | 'put'
        | 'delete'
        | 'GET'
        | 'POST'
        | 'PATCH'
        | 'PUT'
        | 'DELETE';
    headers: Record<string, any>;
    data?: any;
    timeout?: number;
}
export class Transporter {
    hooks = {
        onProgress: new tapable.AsyncParallelHook<[ProgressEvent<EventTarget>]>(['event']),
        onReadyStateChange: new tapable.AsyncParallelHook<[Event]>(['event']),
        onError: new tapable.AsyncParallelHook<[ProgressEvent<EventTarget>]>(['event']),
        onTimeout: new tapable.AsyncParallelHook<[ProgressEvent<EventTarget>]>(['event']),
        onAbort: new tapable.AsyncParallelHook<[ProgressEvent<EventTarget>]>(['event']),
        onFulfilled: new tapable.AsyncParallelHook<[]>([]),
        onRejected: new tapable.AsyncParallelHook<[]>([]),
        beforeSend: new tapable.AsyncSeriesWaterfallHook<[TransporterSendConfig]>(['config']),
        afterSend: new tapable.AsyncParallelHook<[TransporterSendConfig]>(['config']),
        beforeAbort: new tapable.AsyncSeriesWaterfallHook<[boolean]>(['canAbort']),
        afterAbort: new tapable.AsyncParallelHook<[boolean]>(['canAbort']),
    };
    xhr = new XMLHttpRequest();
    data = null;
    promise = Promise.withResolvers<XMLHttpRequest>();
    constructor() {
        const xhr = this.xhr;
        xhr.upload.onprogress = async e => this.hooks.onProgress.promise(e);
        xhr.onerror = async e => this.hooks.onError.promise(e);
        xhr.ontimeout = async e => this.hooks.onTimeout.promise(e);
        xhr.onabort = async e => this.hooks.onAbort.promise(e);
        xhr.onreadystatechange = async e => {
            await this.hooks.onReadyStateChange.promise(e);
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    await this.hooks.onFulfilled.promise();
                    this.promise.resolve(xhr);
                } else if (xhr.status >= 400) {
                    await this.hooks.onRejected.promise();
                    this.promise.reject(xhr);
                }
            }
        };
    }
    async send(config: TransporterSendConfig) {
        config = await this.hooks.beforeSend.promise(config)[1];
        this.xhr.timeout = config.timeout ?? 0;
        this.xhr.open(config.method ?? 'post', config.url, true);
        Object.entries(config.headers ?? {})
            .filter(([_, v]) => v !== null && v !== undefined)
            .forEach(([k, v]) => {
                this.xhr.setRequestHeader(k, `${v}`);
            });
        this.data = config.data;
        this.xhr.send(config.data);
        await this.hooks.afterSend.promise(config);
        return this.promise.promise;
    }
    async abort() {
        const canAbort = await this.hooks.beforeAbort.promise(true);
        if (canAbort) {
            this.xhr.onreadystatechange = noop;
            this.xhr.abort();
        }
        await this.hooks.afterAbort.promise(canAbort);
    }
    getResponse() {
        return this.xhr.response;
    }
    getText() {
        return this.xhr.responseText;
    }
    getJson<T>(): T {
        return JSON.parse(this.xhr.responseText);
    }
}

export class TransporterManager {
    hooks = {
        beforeCreateTransporter: new tapable.AsyncSeriesWaterfallHook<[Transporter]>([
            'transporter',
        ]),
        afterCreateTransporter: new tapable.AsyncParallelHook(),
    };
    async createTransporter() {
        const transporter = await this.hooks.beforeCreateTransporter.promise(
            new this.TransporterClass(),
        );
        await this.hooks.afterCreateTransporter.promise(transporter);
        return transporter;
    }
    constructor(public TransporterClass: new (...args: any[]) => Transporter) {}
}
