import { afterEach, describe, expect, it, rs } from '@rstest/core';

rs.mock('./create-traceid', () => ({
    createTraceId: () => 'trace-fixed',
}));

import { EventSource, getBytes, sseStringify } from './sse';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function createStream(chunks: string[]) {
    return new ReadableStream<Uint8Array>({
        start(controller) {
            for (const chunk of chunks) {
                controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
        },
    });
}

function createResponse(chunks: string[], init?: ResponseInit) {
    return new Response(createStream(chunks), {
        status: 200,
        ...init,
    });
}

describe('sse utilities', () => {
    afterEach(() => {
        rs.restoreAllMocks();
        rs.unstubAllGlobals();
    });

    it('stringifies messages into SSE payload format', () => {
        expect(
            sseStringify({
                event: 'update',
                data: 'hello',
                retry: 3000,
            }),
        ).toBe('event: update\ndata: hello\nretry: 3000\n\n');
    });

    it('reads bytes from a stream chunk by chunk', async () => {
        const chunks: string[] = [];

        await getBytes(createStream(['hello', ' ', 'world']), (value) => {
            chunks.push(decoder.decode(value));
        });

        expect(chunks).toEqual(['hello', ' ', 'world']);
    });
});

describe('EventSource', () => {
    afterEach(() => {
        rs.restoreAllMocks();
        rs.unstubAllGlobals();
    });

    it('injects default request options even when fetch init is omitted', async () => {
        const fetchMock = rs.fn().mockResolvedValue(createResponse([]));
        rs.stubGlobal('fetch', fetchMock);

        const source = new EventSource();

        await source.fetch('https://example.com/sse');

        const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
        const headers = new Headers(init.headers);

        expect(init.signal).toBe(source.ac.signal);
        expect(headers.get('Content-Type')).toBe('application/json');
        expect(headers.get('traceId')).toBe('trace-fixed');
    });

    it('injects default request headers into a native Headers instance', async () => {
        const fetchMock = rs.fn().mockResolvedValue(createResponse([]));
        rs.stubGlobal('fetch', fetchMock);

        const source = new EventSource();

        await source.fetch('https://example.com/sse', {
            headers: new Headers({ 'accept-language': 'en-US' }),
        });

        const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
        const headers = new Headers(init.headers);

        expect(headers.get('Content-Type')).toBe('application/json');
        expect(headers.get('traceId')).toBe('trace-fixed');
        expect(headers.get('accept-language')).toBe('en-US');
    });

    it('parses chunked SSE responses and emits lifecycle events', async () => {
        const fetchMock = rs
            .fn()
            .mockResolvedValue(
                createResponse([
                    'id: abc\r',
                    '\nevent: update\r\ndata: hello\r',
                    '\ndata: world\r\nretry: 1000\r\n\r',
                    '\n',
                ]),
            );
        rs.stubGlobal('fetch', fetchMock);

        const source = new EventSource();
        const statuses: Array<EventSource['status']> = [];
        const ids: string[] = [];
        const retries: number[] = [];
        const messages: unknown[] = [];
        const done = rs.fn();
        const closed = rs.fn();
        const opened = rs.fn();
        const errored = rs.fn();
        const requestSignal = new AbortController().signal;

        source.on('onStatusChange', (status) => statuses.push(status));
        source.on('onId', (id) => ids.push(id));
        source.on('onRetry', (retry) => retries.push(retry));
        source.on('onMessage', (message) => messages.push(message));
        source.on('onDone', done);
        source.on('onClose', closed);
        source.on('onOpen', opened);
        source.on('onError', errored);

        await source.fetch('https://example.com/sse', {
            headers: { Authorization: 'Bearer token' },
            signal: requestSignal,
        });

        const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
        const headers = new Headers(init.headers);

        expect(init.signal).toBe(requestSignal);
        expect(headers.get('Authorization')).toBe('Bearer token');
        expect(headers.get('Content-Type')).toBe('application/json');
        expect(headers.get('traceId')).toBe('trace-fixed');
        expect(opened).toHaveBeenCalledTimes(1);
        expect(errored).not.toHaveBeenCalled();
        expect(statuses).toEqual(['open', 'reading', 'close']);
        expect(ids).toEqual(['abc']);
        expect(retries).toEqual([1000]);
        expect(messages).toEqual([
            {
                id: 'abc',
                event: 'update',
                data: 'hello\nworld',
                retry: 1000,
            },
        ]);
        expect(done).toHaveBeenCalledTimes(1);
        expect(closed).toHaveBeenCalledTimes(1);
        expect(source.getStatus()).toBe('close');
    });

    it('reports non-ok responses as errors and still closes', async () => {
        const fetchMock = rs.fn().mockResolvedValue(createResponse([], { status: 500 }));
        rs.stubGlobal('fetch', fetchMock);

        const source = new EventSource();
        const statuses: Array<EventSource['status']> = [];
        const closed = rs.fn();
        const done = rs.fn();
        const errors: Error[] = [];

        source.on('onStatusChange', (status) => statuses.push(status));
        source.on('onClose', closed);
        source.on('onDone', done);
        source.on('onError', (error) => errors.push(error));

        await source.fetch('https://example.com/sse', {});

        expect(statuses).toEqual(['open', 'close']);
        expect(done).not.toHaveBeenCalled();
        expect(closed).toHaveBeenCalledTimes(1);
        expect(errors).toHaveLength(1);
        expect(errors[0]?.message).toBe('请求失败');
        expect(source.getStatus()).toBe('close');
    });

    it('preserves the error response body and caller-provided tuple headers', async () => {
        const fetchMock = rs
            .fn()
            .mockResolvedValue(new Response('Request limit exceeded', { status: 429 }));
        rs.stubGlobal('fetch', fetchMock);
        const source = new EventSource();
        const onError = rs.fn();
        source.on('onError', onError);

        await source.fetch('https://example.com/sse', {
            headers: [
                ['content-type', 'text/plain'],
                ['traceid', 'caller-trace'],
            ],
        });

        const headers = new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers);
        expect(headers.get('content-type')).toBe('text/plain');
        expect(headers.get('traceid')).toBe('caller-trace');
        expect(onError).toHaveBeenCalledWith(new Error('Request limit exceeded'));
    });

    it('emits messages through fetchObserver and completes on close', async () => {
        rs.stubGlobal(
            'fetch',
            rs
                .fn()
                .mockResolvedValue(
                    createResponse(['data: first\n\n', 'event: update\ndata: second\n\n']),
                ),
        );

        const source = new EventSource();
        const messages: unknown[] = [];

        await new Promise<void>((resolve, reject) => {
            source.fetchObserver('https://example.com/sse', {}).subscribe({
                next(message) {
                    messages.push(message);
                },
                error(error) {
                    reject(error);
                },
                complete() {
                    resolve();
                },
            });
        });

        expect(messages).toEqual([
            {
                id: '',
                event: '',
                data: 'first',
                retry: undefined,
            },
            {
                id: '',
                event: 'update',
                data: 'second',
                retry: undefined,
            },
        ]);
    });

    it('aborts the underlying controller and emits close', () => {
        const source = new EventSource();
        const statuses: Array<EventSource['status']> = [];
        const closed = rs.fn();

        source.on('onStatusChange', (status) => statuses.push(status));
        source.on('onClose', closed);

        source.abort();

        expect(statuses).toEqual(['close']);
        expect(closed).toHaveBeenCalledTimes(1);
        expect(source.getStatus()).toBe('close');
        expect(source.ac.signal.aborted).toBe(true);
    });
});
