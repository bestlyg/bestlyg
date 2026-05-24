import { useRequest } from 'ahooks';
import React from 'react';
import 'highlight.js/styles/github.css';
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
import {
    serverlessCallGet,
    serverlessDelete,
    serverlessFindList,
    serverlessSave,
    serverlessUpdate,
    DatabaseIdParamsRequestDto,
    ServerlessCreateRequestDto,
    ServerlessUpdateRequestDto,
    type Serverless as ServerlessCode,
} from '@bestlyg/client-shared';

async function fetchServerless() {
    return (await serverlessFindList()) ?? [];
}

export default function Serverless() {
    const { toast } = useToast();
    const { data, refresh } = useRequest(fetchServerless);
    const codes =
        data?.sort(
            (a, b) =>
                new Date(a.createdTime ?? 0).getTime() - new Date(b.createdTime ?? 0).getTime(),
        ) ?? [];
    const [activeCodeId, setActiveCodeId] = React.useState('');
    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
                {codes.map((v) => (
                    <Button
                        key={v.id ?? v.name}
                        variant={v.id === activeCodeId ? 'default' : 'outline'}
                        onClick={() => {
                            setCode(v.code ?? '');
                            setName(v.name ?? '');
                            setActiveCodeId(v.id ?? '');
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
                        await serverlessSave(new ServerlessCreateRequestDto({
                            name: Date.now().toString(),
                            code: 'resolve(1)',
                        }));
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
                                const res = await serverlessCallGet({
                                    query: {
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
                                await serverlessUpdate({
                                    params: new DatabaseIdParamsRequestDto({ id: activeCodeId }),
                                    body: new ServerlessUpdateRequestDto({
                                        name,
                                        code,
                                    }),
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
                                            await serverlessDelete(
                                                new DatabaseIdParamsRequestDto({ id: activeCodeId }),
                                            );
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
                defaultValue={
                    (codes as ServerlessCode[]).find((v) => v.id === activeCodeId)?.code ?? ''
                }
                onChange={setCode}
            />
        </div>
    );
}
