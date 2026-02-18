import React from 'react';
import { RouterProvider } from '@/routes';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { useToast } from '@/shadcn/hooks/use-toast';
import { instance, xTokenName, hooks as fetchHooks } from '@/utils';
import { Toaster } from '@/shadcn/ui/toaster';
import { ResponseEntity } from '@bestlyg/common';
// import '@/shadcn/styles/globals.css';
import '@ant-design/v5-patch-for-react-19';
import '@/styles/globals.less';
import 'katex/dist/katex.min.css';

export default function App() {
    const { toast } = useToast();

    React.useEffect(() => {
        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem(xTokenName);
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        fetchHooks.onError.tapPromise('onFetchErorr', async (entity: ResponseEntity<any>) => {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: entity.getMsg(),
            });
        });
    }, []);

    return (
        <StyleProvider layer>
            <ConfigProvider
                theme={{
                    token: {
                        colorLink: 'var(--primary)',
                    },
                }}
            >
                <RouterProvider />
                <Toaster />
            </ConfigProvider>
        </StyleProvider>
    );
}
