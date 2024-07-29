import tapable from 'tapable';

export class Transporter {
    hooks = {
        onProgress: new tapable.AsyncParallelHook<[XMLHttpRequest, ProgressEvent<EventTarget>]>([
            'xhr',
            'event',
        ]),
        onReadyStateChange: new tapable.AsyncParallelHook<[XMLHttpRequest, Event]>([
            'xhr',
            'event',
        ]),
        onError: new tapable.AsyncParallelHook<[XMLHttpRequest, ProgressEvent<EventTarget>]>([
            'xhr',
            'event',
        ]),
        onTimeout: new tapable.AsyncParallelHook<[XMLHttpRequest, ProgressEvent<EventTarget>]>([
            'xhr',
            'event',
        ]),
        onAbort: new tapable.AsyncParallelHook<[XMLHttpRequest, ProgressEvent<EventTarget>]>([
            'xhr',
            'event',
        ]),
    };
    xhr = new XMLHttpRequest();
    data = null;
    constructor() {
        const xhr = this.xhr;
        xhr.upload.onprogress = async e => this.hooks.onProgress.promise(xhr, e);
        xhr.onerror = async e => this.hooks.onError.promise(xhr, e);
        xhr.ontimeout = async e => this.hooks.onTimeout.promise(xhr, e);
        xhr.onabort = async e => this.hooks.onAbort.promise(xhr, e);
        xhr.onreadystatechange = async e => {
            await this.hooks.onReadyStateChange.promise(xhr, e);
            if (xhr.readyState !== 4) {
                return;
            }
        };
    }
    ajax(...params: Parameters<typeof this.xhr.send>) {
        this.xhr.send(...params);
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
            new this.TransporterClass()
        );
        await this.hooks.afterCreateTransporter.promise(transporter);
        return transporter;
    }
    constructor(public TransporterClass: new (...args: any[]) => Transporter) {}
}
// import EventEmitter from 'events';

// const util = { noop: () => {} };

// export default class Transport extends EventEmitter {
//     constructor() {
//         super();
//         this.xhr = new XMLHttpRequest();
//         this._data = null;
//     }

//     _ajax(form) {
//         const { xhr } = this;
//         xhr.upload.onprogress = e => {
//             this.emit('progress', e);
//         };
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState !== 4) {
//                 return;
//             }
//             xhr.upload.onprogress = util.noop;
//             xhr.onreadystatechange = util.noop;

//             // 仅在日志上报时会使用到，上报params、url字段
//             xhr.params = form;
//             if (this._data && this._data.url) {
//                 xhr.currentUrl = this._data.url;
//             }

//             if (xhr.status >= 200 && xhr.status < 300) {
//                 this.emit('complete', xhr);
//             } else if (xhr.status >= 400) {
//                 this.emit('error', xhr);
//             }
//         };

//         xhr.onerror = () => {
//             xhr.errText = 'unknow net error';
//             this.emit('error', xhr);
//         };
//         xhr.ontimeout = () => {
//             xhr.errText = 'timeout';
//             this.emit('error', xhr);
//         };
//         xhr.onabort = () => {
//             xhr.errText = 'abort';
//             this.emit('error', xhr);
//         };
//         xhr.send(form);
//     }

//     /**
//      * @param: {object} data 发送选项
//      *     headers {object} 请求头
//      *     binary {boolean} 使用二进制开发
//      *     formData {array|function} 发送的formData（非FormData实例）
//      *     field 文件表单名字
//      *     name 文件名 如果为空使用file.name
//      *     file 文件
//      */
//     send(data) {
//         this._data = data;
//         // 默认为post请求async必须为true
//         this.xhr.open(data.method || 'POST', data.url || '', true);
//         if (data.headers) {
//             Object.keys(data.headers).forEach(header => {
//                 this.xhr.setRequestHeader(header, data.headers[header]);
//             });
//         }
//         // 设置超时（如果有的话）
//         this.xhr.timeout = data.timeout || 0;
//         if (data.ontimeout) {
//             this.xhr.ontimeout = data.ontimeout;
//         }
//         if (data.binary) {
//             return this.sendAsBinary(data);
//         } else if (data.custom) {
//             if (typeof data.custom === 'object') {
//                 return this.sendAsCustom(JSON.stringify(data.custom));
//             }
//             if (data.custom === 'none') {
//                 delete data.custom;
//                 return this.sendAsCustom();
//             }
//             return this.sendAsCustom(data.custom);
//         }
//         return this.sendAsFormData(data);
//     }

//     /**
//      * 使用二进制流发送
//      * 不会自动处理formData 如果需传递参数请通过url
//      */
//     sendAsBinary(data) {
//         // 接收头为octet－stream
//         this.xhr.setRequestHeader('Content-Type', 'application/octet-stream');
//         this.xhr.setRequestHeader(
//             'Content-Disposition',
//             `attachment; filename="${encodeURI(data.filename)}"`
//         );
//         return this._ajax(data.file);
//     }

//     /**
//      * 使用formdata发送 如果有formdata则会处理formData里面的数据
//      */
//     sendAsFormData(data) {
//         let forms;
//         if (data.formData) {
//             if (typeof data.formData === 'function') {
//                 forms = data.formData();
//             } else {
//                 forms = data.formData;
//             }
//         }
//         if (!forms) {
//             forms = [];
//         }
//         const formData = new FormData();
//         for (let i = 0, l = forms.length; i < l; i++) {
//             const form = formData[i];
//             formData.append(form.name, form.value);
//         }
//         if (data.file) {
//             formData.append(data.field, data.file, data.name);
//         }
//         return this._ajax(formData);
//     }

//     /*
//     @Des: 发送自定义的内容
//     */
//     sendAsCustom(data) {
//         return this._ajax(data);
//     }

//     abort() {
//         this.xhr.onreadystatechange = util.noop;
//         this.xhr.abort();
//         // this.emit('abort', this.xhr);
//     }
//     getResponse() {
//         return this.xhr.response;
//     }
//     getText() {
//         return this.xhr.responseText;
//     }
//     getJson() {
//         return JSON.parse(this.xhr.responseText);
//     }
// }
