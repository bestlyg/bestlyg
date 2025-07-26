import { useRequest } from 'ahooks';
import { Prisma } from '@bestlyg/common/prisma-client';
// import { serverManifest } from '@bestlyg/common';
import React from 'react';
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
import { MonacoEditor } from '@/components/monaco-editor';
import { apiMap } from '@bestlyg/common';
import { request } from '@/utils';

export type ServerlessData = Prisma.ServerlessGetPayload<{
    include: { codes: true };
}>;

async function fetchServerless() {
    const data = await request<any, ServerlessData[] | null>({
        url: apiMap.ServerlessController.getServerless.path,
        method: apiMap.ServerlessController.getServerless.method,
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
    const [activeCodeId, setActiveCodeId] = React.useState('');
    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
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
                        await request({
                            serializer: 'json',
                            url: apiMap.ServerlessCodeController.createServerlessCode.path,
                            method: apiMap.ServerlessCodeController.createServerlessCode.method,
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
                                const res = await request({
                                    serializer: 'json',
                                    url: apiMap.ServerlessController.callGet.path,
                                    method: apiMap.ServerlessController.callGet.method,
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
                            onClick={async () => {
                                await request({
                                    url: apiMap.ServerlessCodeController.updateServerlessCode.path,
                                    method: apiMap.ServerlessCodeController.updateServerlessCode
                                        .method,
                                    data: {
                                        id: activeCodeId,
                                        name,
                                        code,
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
                                            await request({
                                                url: apiMap.ServerlessCodeController
                                                    .deleteServerlessCode.path,
                                                method: apiMap.ServerlessCodeController
                                                    .deleteServerlessCode.method,
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
            <MonacoEditor
                defaultValue={codes.find(v => v.id === activeCodeId)?.code ?? ''}
                onChange={setCode}
            />
        </div>
    );
}
