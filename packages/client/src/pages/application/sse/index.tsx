import { Markdown } from '@/components/markdown';
import { Button } from '@/shadcn/ui/button';
import { Textarea } from '@/shadcn/ui/textarea';
import { useBoolean } from 'ahooks';
import { useState } from 'react';
import { sse, apiMap } from '@bestlyg/common';
import { xTokenName } from '@/utils';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const defaultInput = `
# A

## B

cccccc

- c
`;

export default function Sse() {
    const [inputVal, setInputVal] = useState(defaultInput);
    const [md, setMd] = useState('');
    async function run() {
        // console.log('SSE RUN');
        // const instance = new sse.EventSource();
        // instance.on('onProgress', msg => {
        //     if (msg.data && msg.data.code === 0) {
        //         const str = msg.data?.data ?? '';
        //         console.log('onProgress', JSON.stringify(str));
        //         setMd(old => old + str);
        //     }
        // });
        // instance.on('onError', err => {
        //     console.log('onError', err);
        // });
        const headers: HeadersInit = {
            'content-type': 'application/json; charset=utf-8',
        };
        const token = localStorage.getItem(xTokenName);
        if (token) headers.Authorization = `Bearer ${token}`;
        // instance.fetch(apiMap.AppController.sse.path, {
        //     method: apiMap.AppController.sse.method,
        //     headers,
        //     body: JSON.stringify({ data: inputVal, sleepTime: 300 }),
        // });
        const ac = new AbortController();
        fetchEventSource(apiMap.AppController.sse.path, {
            method: apiMap.AppController.sse.method,
            headers,
            body: JSON.stringify({ data: inputVal, sleepTime: 300 }),
            signal: ac.signal,
            onmessage(msg) {
                try {
                    const data = JSON.parse(msg.data);
                    if (data.code === 0) {
                        setMd(old => old + data.data);
                    }
                } catch (_) {}
            },
        }).catch(err => {
            console.log('ERR', err);
        });
        return () => {
            ac.abort();
        };
    }
    const [loading, loadingOps] = useBoolean(false);
    return (
        <div className="w-full flex flex-col gap-2">
            <Textarea
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                className="h-[400px]"
            />
            <Button
                disabled={loading}
                onClick={() => {
                    setMd('');
                    loadingOps.setTrue();
                    run().finally(() => {
                        loadingOps.setFalse();
                    });
                }}
            >
                Run
            </Button>
            <Markdown md={md} />
        </div>
    );
}
