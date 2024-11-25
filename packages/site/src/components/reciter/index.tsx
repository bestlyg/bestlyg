import { Button, Input } from 'antd';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

export type Status = 'recite' | 'inspect' | 'init';
export function Reciter({ children }: PropsWithChildren<{}>) {
    const text: string = (children as any).props.children;
    const [status, setStatus] = useState<Status>('init');
    const [inputVal, setInputVal] = useState('');
    const inspectRef = useRef<HTMLSpanElement>({} as HTMLSpanElement);
    useEffect(() => {
        if (!inspectRef.current) return;
        let htmlText = '';
        for (let i = 0; i < text.length; i++) {
            if (inputVal[i] === text[i]) {
                htmlText += text[i];
            } else {
                htmlText += `<span style='color:red;'>${text[i]}</span>`;
            }
        }
        inspectRef.current.innerHTML = htmlText;
    }, [inputVal, status]);
    return (
        <p>
            {status !== 'recite' && <span>{text}</span>}
            {status !== 'init' && (
                <Input.TextArea
                    autoSize
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                />
            )}
            {status === 'inspect' && (
                <>
                    <br />
                    <span ref={inspectRef} />
                </>
            )}
            {status === 'init' && (
                <Button
                    variant="link"
                    type="link"
                    onClick={() => {
                        setStatus('recite');
                    }}
                >
                    Recite
                </Button>
            )}
            {status === 'recite' && (
                <Button
                    variant="link"
                    type="link"
                    onClick={() => {
                        setStatus('inspect');
                    }}
                >
                    Inspect
                </Button>
            )}
            {status === 'inspect' && (
                <Button
                    variant="link"
                    type="link"
                    onClick={() => {
                        setInputVal('');
                        inspectRef.current.innerHTML = '';
                        setStatus('init');
                    }}
                >
                    ReInit
                </Button>
            )}
        </p>
    );
}
