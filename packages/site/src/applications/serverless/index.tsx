import '@ant-design/v5-patch-for-react-19';
import { useRequest } from 'ahooks';
import { useRequest as getRequestFn } from '@site/src/utils';
import { prismaClient } from '@bestlyg/data';
import { Button, Flex, Input, message, Popconfirm, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github.css';
import _ from 'lodash';
import { ResponseEntity } from '@bestlyg/common';

export function Serverless() {
    const request = getRequestFn();
    const { data, refresh } = useRequest<
        (prismaClient.Serverless & { codes?: prismaClient.ServerlessCode })[],
        any
    >(async () => request('/api/data/serverless'));
    const codes = data?.flatMap(v => v.codes) ?? [];
    const [activeCodeId, setActiveCodeId] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const codeEditRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        hljs.registerLanguage('typescript', typescript);
    }, []);
    const refreshHighlight = () => {
        if (codeEditRef.current) {
            // codeEditRef.current.innerHTML = code;
            // hljs.highlightElement(codeEditRef.current);
            codeEditRef.current.innerHTML = hljs.highlightAuto(code).value;
        }
    };
    useEffect(() => {
        refreshHighlight();
    }, [code]);
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Flex wrap gap="small">
                {codes.map(v => (
                    <Button
                        key={v.id}
                        type={v.id === activeCodeId ? 'primary' : 'default'}
                        onClick={() => {
                            setCode(v.code);
                            setName(v.name);
                            setActiveCodeId(v.id);
                        }}
                    >
                        {v.name}
                    </Button>
                ))}
            </Flex>
            <Flex wrap gap="small">
                <Input
                    style={{ width: '200px' }}
                    value={name}
                    onInput={(e: any) => {
                        const val = e.target.value;
                        setName(val);
                    }}
                />
                <Button
                    onClick={async () => {
                        await request('/api/data/serverless-code', {
                            method: 'POST',
                            body: {
                                name: Date.now().toString(),
                                code: '',
                            } as any,
                        });
                        message.success('New successful.');
                        refresh();
                    }}
                >
                    New
                </Button>
                <Button
                    onClick={() => {
                        const content = codeEditRef.current.textContent;
                        setCode(content);
                        refreshHighlight();
                    }}
                >
                    highlight
                </Button>
                <Button
                    onClick={async () => {
                        if (!codeEditRef.current || !name) return;
                        const content = codeEditRef.current.textContent;
                        await request('/api/data/serverless-code', {
                            method: 'PATCH',
                            body: {
                                id: activeCodeId,
                                name,
                                code: content,
                            } as any,
                        });
                        message.success('Save successful.');
                        refresh();
                    }}
                >
                    Save
                </Button>
                <Popconfirm
                    title={`Delete the code`}
                    description="Are you sure to delete this code?"
                    onConfirm={async () => {
                        await request('/api/data/serverless-code', {
                            method: 'DELETE',
                            body: {
                                id: activeCodeId,
                            } as any,
                        });
                        message.success('Delete successful.');
                        refresh();
                        setName('');
                        setCode('');
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button>Delete</Button>
                </Popconfirm>
            </Flex>
            <pre style={{ minHeight: '80px', width: '100%' }}>
                <code ref={codeEditRef} contentEditable className="language-typescript" />
            </pre>
        </Space>
    );
}
