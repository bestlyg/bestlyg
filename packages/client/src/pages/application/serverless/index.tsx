import { useRequest } from 'ahooks';
import { Prisma } from '@bestlyg/data/prisma-client';
import { fetch } from '@bestlyg/common/idl/utils';
import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github.css';
import _ from 'lodash';
import { useToast } from '@/shadcn/hooks/use-toast';
import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shadcn/ui/alert-dialog';

export type ServerlessData = Prisma.ServerlessGetPayload<{
    include: { codes: true };
}>;

async function fetchServerless() {
    const data = await fetch<any, ServerlessData[] | null>({
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
    const codes =
        data
            ?.flatMap(v => v.codes)
            .sort(
                (a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime(),
            ) ?? [];
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
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
                {codes.map(v => (
                    <Button
                        key={v.id}
                        variant={v.id === activeCodeId ? 'default' : 'outline'}
                        onClick={() => {
                            setCode(v.code);
                            setName(v.name);
                            setActiveCodeId(v.id);
                        }}
                    >
                        {v.name}
                    </Button>
                ))}
            </div>
            <div className="flex gap-2">
                <Input
                    style={{ width: '200px' }}
                    value={name}
                    onInput={(e: any) => {
                        const val = e.target.value;
                        setName(val);
                    }}
                />
                <Button
                    variant="outline"
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
                {activeCodeId && (
                    <>
                        <Button
                            variant="outline"
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
                            variant="outline"
                            onClick={() => {
                                const content = codeEditRef.current?.textContent ?? '';
                                setCode(content);
                                refreshHighlight();
                            }}
                        >
                            Highlight
                        </Button>
                        <Button
                            variant="outline"
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle> Delete Code</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you absolutely sure to delete the code `{name}`?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>No</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
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
                                    >
                                        Yes
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )}
            </div>
            <pre className="!min-h-[80px] !w-full">
                <code
                    ref={codeEditRef}
                    contentEditable
                    className="language-typescript h-full w-full block"
                />
            </pre>
        </div>
    );
}
