import { produce } from 'immer';
import { EventEmitter } from 'eventemitter3';

export interface EventSourceMessage<T = string> {
    /** The event ID to set the EventSource object's last event ID value. */
    id?: string;
    /** A string identifying the type of event described. */
    event?: string;
    /** The event data */
    data?: SSEData<T>;
    /** The reconnection interval (in milliseconds) to wait before retrying the connection */
    retry?: number;
    type?: string;
}

// export const EventSourceMessageKeys = ['id', 'event', 'data', 'retry', 'type'] as const;

export class SSEData<T = string> {
    code: number = 0;
    data?: T;
    msg?: string;
}

// export interface SSEHooks {
//     onOpen: (response: globalThis.Response) => void;
//     onProgress: <T>(msg: EventSourceMessage<T>) => void;
//     onError: (err: any) => void;
//     onStatusChange: (status: EventSource['status']) => void;
//     onClose: () => void;
// }

export const SPLIT_TAG = ': ';

export const defaultResponseHeaders = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
} as const;

export const defaultRequestHeaders = {
    'Content-Type': 'application/json',
} as const;

export function stringify<T>(message: EventSourceMessage<T>) {
    const str = Object.entries(message)
        .map(([k, v]) => `${k}${SPLIT_TAG}${JSON.stringify(v)}`)
        .join('\n');
    return str + '\n\n';
}

// export class EventSource extends EventEmitter<SSEHooks> {
//     private ac = new AbortController();
//     private status: 'ready' | 'open' = 'ready';
//     private decoder = new TextDecoder();

//     setStatus(v: EventSource['status']) {
//         this.status = v;
//         this.emit('onStatusChange', v);
//         return this;
//     }

//     async fetch<T>(...args: Parameters<typeof fetch>) {
//         this.setStatus('open');
//         try {
//             args[1] = produce(args[1], draft => {
//                 draft ??= {};
//                 draft.signal ??= this.ac.signal;
//                 draft.headers ??= {};
//                 for (const [k, v] of Object.entries(defaultRequestHeaders)) {
//                     (draft.headers as Record<string, string>)[k] ??= v;
//                 }
//             });
//             const response = await fetch(...args);
//             this.emit('onOpen', response);
//             if (!response.ok) throw new Error('请求失败');
//             if (response.body) {
//                 const reader = response.body.getReader();
//                 let done = false;
//                 // 在循环外部实例化 TextDecoder，提高性能。
//                 while (!done) {
//                     const { done: isDone, value } = await reader.read();
//                     done = isDone;
//                     if (!done) {
//                         const text = this.decoder.decode(value, { stream: true });
//                         console.log('text', JSON.stringify(text));
//                         for (const item of text.split('\n\n')) {
//                             if (item === '') continue;
//                             const msg: EventSourceMessage = {};
//                             for (const str of item.split('\n')) {
//                                 for (const key of EventSourceMessageKeys) {
//                                     const startStr = key + SPLIT_TAG;
//                                     if (str.startsWith(startStr)) {
//                                         const data = JSON.parse(item.substring(startStr.length));
//                                         msg[key] = data;
//                                         if (data.code !== 0) throw new Error(data.msg);
//                                     }
//                                 }
//                             }
//                             this.emit('onProgress', msg);
//                         }
//                     }
//                 }
//             }
//             this.emit('onClose');
//         } catch (err) {
//             this.emit('onError', err);
//         }
//     }
//     abort() {
//         if (this.status === 'open') {
//             this.ac.abort();
//         }
//     }
// }

// export class SSE<T = any> {
//     static write<T>(res: Response, tag: string, instance: SSE<T>) {
//         return res.write(`${tag}${JSON.stringify(instance)}\n\n`);
//     }
//     static writeData<T>(res: Response, instance: SSE<T>) {
//         return this.write(res, this.DATA_TAG, instance);
//     }
//     static from<T>(text: string): SSE<T> {
//         if (text.startsWith(SSE.DATA_TAG)) {
//             const data = JSON.parse(text.substring(SSE.DATA_TAG.length));
//             return new SSE().set('data', data.data).set('code', data.code).set('msg', data.msg);
//         }
//         throw new Error('Unsupport data');
//     }

//     set<K extends keyof this>(key: K, val: this[K]) {
//         this[key] = val;
//         return this;
//     }

//     toJSON() {
//         return { code: this.code, msg: this.msg, data: this.data };
//     }

//     static async fetch<T>(...args: Parameters<typeof fetch>) {
//         const ac = new AbortController();
//         const defaultHeaders: Record<string, string> = {
//             'Content-Type': 'application/json',
//         };

//         args[1] = produce(args[1], draft => {
//             draft ??= {};
//             draft.signal ??= ac.signal;
//             draft.headers ??= {};
//             for (const [k, v] of Object.entries(defaultHeaders)) {
//                 (draft.headers as Record<string, string>)[k] ??= v;
//             }
//         });

//         const hook = new EventEmitter<SSEHooks>();

//         const response = await fetch(...args);

//         if (!response.ok) throw new Error('请求失败');
//         if (response.body) {
//             const reader = response.body.getReader();
//             let done = false;
//             // 在循环外部实例化 TextDecoder，提高性能。
//             const decoder = new TextDecoder();
//             while (!done) {
//                 const { done: isDone, value } = await reader.read();
//                 done = isDone;
//                 if (!done) {
//                     const text = decoder.decode(value, { stream: true });
//                     const data = SSE.from<T>(text);
//                     if (data.code !== 0) throw new Error(data.msg);
//                     await onProgress(data.data);
//                 }
//             }
//         }

//         return { hook, abort: () => ac.abort() };
//     }
// }
