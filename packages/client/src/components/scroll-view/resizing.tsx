import React from 'react';
import { useLatest } from 'ahooks';

export const defaultSize = { offsetHeight: 0, offsetWidth: 0, height: 0, width: 0 };

export interface ResizingProps {
    children: (
        currentRef: React.Ref<HTMLDivElement | null>,
        prevRef: React.Ref<HTMLDivElement | null>,
    ) => React.ReactNode;
    onResize?: (params: {
        current: typeof defaultSize;
        previous: typeof defaultSize | null;
        target: Element;
        targetStandBy: HTMLDivElement | null;
    }) => void;
}

export const Resizing: React.FC<ResizingProps> = ({ children, onResize }) => {
    const currentRef = React.useRef<HTMLDivElement | null>(null);
    const prevRef = React.useRef<HTMLDivElement | null>(null);
    const onResizeRef = useLatest(onResize);
    const prevSizeRef = React.useRef<{
        width: number;
        height: number;
        offsetWidth: number;
        offsetHeight: number;
    } | null>(null);

    React.useLayoutEffect(() => {
        if (!window.ResizeObserver) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries.find((e) => e.target === currentRef.current);
            if (!entry) return;

            const target = entry.target as HTMLElement;
            const { offsetWidth, offsetHeight } = target;
            const {
                contentRect: { width, height },
            } = entry;

            const currentSize = { width, height, offsetWidth, offsetHeight };

            onResizeRef.current?.({
                current: currentSize,
                previous: prevSizeRef?.current,
                target: entry.target,
                targetStandBy: prevRef.current,
            });
            prevSizeRef.current = currentSize;
        });

        if (currentRef.current) {
            observer.observe(currentRef.current);
        }

        return () => {
            if (currentRef.current) {
                onResizeRef.current?.({
                    current: defaultSize,
                    previous: prevSizeRef.current,
                    target: currentRef.current,
                    targetStandBy: prevRef.current,
                });
            }
            observer.disconnect();
        };
    }, []);

    return <>{children(currentRef, prevRef)}</>;
};
