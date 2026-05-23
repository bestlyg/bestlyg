/* eslint-disable @typescript-eslint/ban-ts-comment */
import { produce } from 'immer';
import { EventEmitter } from 'eventemitter3';
import { Observable } from 'rxjs';
import { createTraceId } from './create-traceid';

type HeadersInit = [string, string][] | Record<string, string> | Headers;

/**
 * Represents a message sent in an event stream
 * https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
 */
export interface EventSourceMessage {
    /** The event ID to set the EventSource object's last event ID value. */
    id?: string;
    /** A string identifying the type of event described. */
    event?: string;
    /** The event data */
    data?: string;
    /** The reconnection interval (in milliseconds) to wait before retrying the connection */
    retry?: number;
}

export interface SSEHooks {
    onOpen: (response: globalThis.Response) => void;
    onMessage: (msg: EventSourceMessage) => void;
    onId: (id: string) => void;
    onRetry: (retry: number) => void;
    onError: (err: any) => void;
    onStatusChange: (status: EventSource['status']) => void;
    onClose: () => void;
    onDone: () => void;
}

export const SPLIT_TAG = ': ';

export const sseDefaultResponseHeaders: HeadersInit = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
};

export const sseDefaultRequestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
};

export const defaultResponseHeaders = sseDefaultResponseHeaders;
export const defaultRequestHeaders = sseDefaultRequestHeaders;

/** 将 SSE 消息对象序列化为 text/event-stream 格式的文本块。 */
export function sseStringify(message: EventSourceMessage) {
    const str = Object.entries(message)
        .map(([k, v]) => `${k}${SPLIT_TAG}${v}`)
        .join('\n');
    return str + '\n\n';
}

export const stringify = sseStringify;

/** 基于 fetch 的轻量 SSE 客户端，支持事件监听、Observable 包装和主动中断。 */
export class EventSource extends EventEmitter<SSEHooks> {
    ac = new AbortController();
    status: 'ready' | 'open' | 'reading' | 'close' = 'ready';
    constructor() {
        super();
    }

    /** 获取当前连接状态。 */
    getStatus() {
        return this.status;
    }

    /** 设置当前连接状态，并触发 onStatusChange hook。 */
    setStatus(v: EventSource['status']) {
        this.status = v;
        this.emit('onStatusChange', v);
        return this;
    }

    /** 设置实例字段并返回当前实例，便于链式配置。 */
    set<K extends keyof this, V extends this[K]>(key: K, val: V) {
        this[key] = val;
        return this;
    }

    /** 读取实例字段。 */
    get<K extends keyof this>(key: K) {
        return this[key];
    }

    /** 发起 SSE 请求并把流式消息转发为 EventEmitter 事件。 */
    async fetch(...args: Parameters<typeof fetch>) {
        this.setStatus('open');
        try {
            args[1] = produce(args[1] ?? {}, (draft) => {
                draft ??= {};
                draft.signal ??= this.ac.signal;
                draft.headers ??= {};
                const headers = draft.headers as Record<string, string>;
                for (const [k, v] of Object.entries(sseDefaultRequestHeaders)) {
                    headers[k] ??= v;
                }
                headers.traceId ??= createTraceId();
            });
            const response = await fetch(...args);
            this.emit('onOpen', response);
            if (!response.ok) throw new Error('请求失败');
            this.setStatus('reading');
            await getBytes(
                response.body!,
                getLines(
                    getMessages(
                        (id) => this.emit('onId', id),
                        (retry) => this.emit('onRetry', retry),
                        (msg) => this.emit('onMessage', msg),
                    ),
                ),
            );
            this.emit('onDone');
        } catch (err) {
            this.emit('onError', err);
        } finally {
            this.setStatus('close');
            this.emit('onClose');
        }
    }

    /** 将 SSE 请求封装成 RxJS Observable。 */
    fetchObserver(...args: Parameters<typeof this.fetch>) {
        return new Observable<EventSourceMessage>((subscriber) => {
            // subscriber.next(attr);

            this.on('onMessage', (msg) => {
                subscriber.next(msg);
            });

            this.on('onError', (err) => {
                // subscriber.next(mocked);
                subscriber.error(err);
            });

            this.on('onClose', () => {
                // subscriber.next(mocked);
                subscriber.complete();
            });

            this.fetch(...args);
        });
    }

    /** 主动关闭连接并中断底层 fetch。 */
    abort() {
        this.setStatus('close');
        this.emit('onClose');
        this.ac.abort();
    }
}

/**
 * Converts a ReadableStream into a callback pattern.
 * @param stream The input ReadableStream.
 * @param onChunk A function that will be called on each new byte chunk in the stream.
 * @returns {Promise<void>} A promise that will be resolved when the stream closes.
 */
export async function getBytes(
    stream: ReadableStream<Uint8Array>,
    onChunk: (arr: Uint8Array) => void,
) {
    const reader = stream.getReader();
    let result: Awaited<ReturnType<typeof reader.read>>;
    while (!(result = await reader.read()).done) {
        onChunk(result.value);
    }
}

const enum ControlChars {
    NewLine = 10,
    CarriageReturn = 13,
    Space = 32,
    Colon = 58,
}

/**
 * Parses arbitary byte chunks into EventSource line buffers.
 * Each line should be of the format "field: value" and ends with \r, \n, or \r\n.
 * @param onLine A function that will be called on each new EventSource line.
 * @returns A function that should be called for each incoming byte chunk.
 */
export function getLines(onLine: (line: Uint8Array, fieldLength: number) => void) {
    let buffer: Uint8Array | undefined;
    let position: number; // current read position
    let fieldLength: number; // length of the `field` portion of the line
    let discardTrailingNewline = false;

    // return a function that can process each incoming byte chunk:
    return function onChunk(arr: Uint8Array) {
        if (buffer === undefined) {
            buffer = arr;
            position = 0;
            fieldLength = -1;
        } else {
            // we're still parsing the old line. Append the new bytes into buffer:
            buffer = concat(buffer, arr);
        }

        const bufLength = buffer.length;
        let lineStart = 0; // index where the current line starts
        while (position < bufLength) {
            if (discardTrailingNewline) {
                if (buffer[position] === ControlChars.NewLine) {
                    lineStart = ++position; // skip to next char
                }

                discardTrailingNewline = false;
            }

            // start looking forward till the end of line:
            let lineEnd = -1; // index of the \r or \n char
            for (; position < bufLength && lineEnd === -1; ++position) {
                switch (buffer[position]) {
                    case ControlChars.Colon:
                        if (fieldLength === -1) {
                            // first colon in line
                            fieldLength = position - lineStart;
                        }
                        break;
                    // @ts-ignore:7029 \r case below should fallthrough to \n:
                    case ControlChars.CarriageReturn:
                        discardTrailingNewline = true;
                    case ControlChars.NewLine:
                        lineEnd = position;
                        break;
                }
            }

            if (lineEnd === -1) {
                // We reached the end of the buffer but the line hasn't ended.
                // Wait for the next arr and then continue parsing:
                break;
            }

            // we've reached the line end, send it out:
            onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
            lineStart = position; // we're now on the next line
            fieldLength = -1;
        }

        if (lineStart === bufLength) {
            buffer = undefined; // we've finished reading it
        } else if (lineStart !== 0) {
            // Create a new view into buffer beginning at lineStart so we don't
            // need to copy over the previous lines when we get the new arr:
            buffer = buffer.subarray(lineStart);
            position -= lineStart;
        }
    };
}

/**
 * Parses line buffers into EventSourceMessages.
 * @param onId A function that will be called on each `id` field.
 * @param onRetry A function that will be called on each `retry` field.
 * @param onMessage A function that will be called on each message.
 * @returns A function that should be called for each incoming line buffer.
 */
export function getMessages(
    onId: (id: string) => void,
    onRetry: (retry: number) => void,
    onMessage?: (msg: EventSourceMessage) => void,
) {
    let message = newMessage();
    const decoder = new TextDecoder();

    // return a function that can process each incoming line buffer:
    return function onLine(line: Uint8Array, fieldLength: number) {
        if (line.length === 0) {
            // empty line denotes end of message. Trigger the callback and start a new message:
            onMessage?.(message);
            message = newMessage();
        } else if (fieldLength > 0) {
            // exclude comments and lines with no values
            // line is of format "<field>:<value>" or "<field>: <value>"
            // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
            const field = decoder.decode(line.subarray(0, fieldLength));
            const valueOffset =
                fieldLength + (line[fieldLength + 1] === ControlChars.Space ? 2 : 1);
            const value = decoder.decode(line.subarray(valueOffset));

            switch (field) {
                case 'data':
                    // if this message already has data, append the new value to the old.
                    // otherwise, just set to the new value:
                    message.data = message.data ? message.data + '\n' + value : value; // otherwise,
                    break;
                case 'event':
                    message.event = value;
                    break;
                case 'id':
                    onId((message.id = value));
                    break;
                case 'retry':
                    const retry = parseInt(value, 10);
                    if (!isNaN(retry)) {
                        // per spec, ignore non-integers
                        onRetry((message.retry = retry));
                    }
                    break;
            }
        }
    };
}

function concat(a: Uint8Array, b: Uint8Array) {
    const res = new Uint8Array(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
}

function newMessage(): EventSourceMessage {
    // data, event, and id must be initialized to empty strings:
    // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
    // retry should be initialized to undefined so we return a consistent shape
    // to the js engine all the time: https://mathiasbynens.be/notes/shapes-ics#takeaways
    return {
        data: '',
        event: '',
        id: '',
        retry: undefined,
    };
}
