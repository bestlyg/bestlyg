import React from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Spin } from "antd";

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
      <Spin
        spinning={promise !== deferredPromise}
        indicator={<LoadingSpinner />}
      >
        <Component promise={deferredPromise} />
      </Spin>
    </React.Suspense>
  );
}
