import { useRequest } from 'ahooks';
import { prismaClient } from '@bestlyg/data';
import { fetch } from '@bestlyg/common/idl/utils';
import { Button, Flex, Input, Popconfirm, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github.css';
import _ from 'lodash';
import { useToast } from '@/shadcn/hooks/use-toast';

export type ServerlessData = prismaClient.Prisma.ServerlessGetPayload<{
    include: { codes: true };
}>;

async function fetchServerless(): Promise<ServerlessData[] | null> {
    const data = await fetch({
        url: '/api/data/serverless',
        method: 'get',
        data: {},
        serializer: 'json',
    });
    return data;
}

export default function Serverless() {
    const { toast } = useToast();

    const { data, refresh } = useRequest(fetchServerless);
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
                        await fetch({
                            serializer: 'json',
                            url: '/api/data/serverless-code',
                            method: 'post',
                            data: {
                                name: Date.now().toString(),
                                code: 'resolve(1)',
                            },
                        });
                        toast({
                            title: 'Successful',
                            description: 'create a new serverless code.',
                        });
                        refresh();
                    }}
                >
                    New
                </Button>
                <Button
                    onClick={async () => {
                        const res = await fetch({
                            serializer: 'json',
                            url: '/api/serverless/call',
                            method: 'get',
                            data: {
                                name,
                            },
                        });
                        toast({
                            title: 'Successful',
                            description: JSON.stringify(res),
                        });
                    }}
                >
                    Call
                </Button>
                <Button
                    onClick={() => {
                        const content = codeEditRef.current?.textContent ?? '';
                        setCode(content);
                        refreshHighlight();
                    }}
                >
                    Highlight
                </Button>
                <Button
                    onClick={async () => {
                        if (!codeEditRef.current || !name) return;
                        const content = codeEditRef.current.textContent;
                        await fetch({
                            url: '/api/data/serverless-code',
                            method: 'patch',
                            data: {
                                id: activeCodeId,
                                name,
                                code: content,
                            },
                            serializer: 'json',
                        });
                        toast({
                            title: 'Successful',
                            description: `save ${name}'s code.`,
                        });
                        refresh();
                    }}
                >
                    Save
                </Button>
                <Popconfirm
                    title={`Delete the code`}
                    description="Are you sure to delete this code?"
                    onConfirm={async () => {
                        await fetch({
                            url: '/api/data/serverless-code',
                            method: 'delete',
                            data: {
                                id: activeCodeId,
                            },
                            serializer: 'json',
                        });
                        toast({
                            title: 'Successful',
                            description: `delete ${name}'s code.`,
                        });
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
            <pre className="!min-h-[80px] !w-full">
                <code
                    ref={codeEditRef}
                    contentEditable
                    className="language-typescript h-full w-full block"
                />
            </pre>
        </Space>
    );
}
