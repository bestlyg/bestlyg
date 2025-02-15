import React from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Spin } from 'antd';

function DefaultSuspenseComponent() {
    return <></>;
}

export function Suspense<T>({
    promise = Promise.resolve(null as any as T),
    fallback = <DefaultSuspenseComponent />,
    Component = DefaultSuspenseComponent,
}: {
    promise?: Promise<T>;
    fallback?: React.ReactNode;
    Component?: React.FC<{ promise: Promise<T> }>;
}) {
    const deferredPromise = React.useDeferredValue(promise, promise);
    return (
        <React.Suspense fallback={fallback}>
            <Spin spinning={promise !== deferredPromise} indicator={<LoadingSpinner />}>
                <Component promise={deferredPromise} />
            </Spin>
        </React.Suspense>
    );
}

export function Suspense2<T>({
    promise = Promise.resolve(null as any as T),
    fallback = <DefaultSuspenseComponent />,
    node,
}: {
    promise?: Promise<T>;
    fallback?: React.ReactNode;
    node?: React.ReactNode;
}) {
    const deferredPromise = React.useDeferredValue(promise, promise);
    const newNode = React.useMemo(
        () =>
            React.isValidElement(node)
                ? React.cloneElement(node as any, { promise: deferredPromise })
                : node,
        [node],
    );
    return (
        <React.Suspense fallback={fallback}>
            <Spin spinning={promise !== deferredPromise} indicator={<LoadingSpinner />}>
                {newNode}
            </Spin>
        </React.Suspense>
    );
}
