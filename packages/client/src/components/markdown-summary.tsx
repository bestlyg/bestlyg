import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import React from 'react';
import { markdownRenderingAtom } from '@/components/markdown';
import { Spin } from 'antd';
import { LoadingSpinner } from '@/components/loading-spinner';

export interface MarkdownSummaryInfo {
    title: string;
    dom: HTMLElement;
    items: MarkdownSummaryInfo[];
}

export function getMarkdownSummaryInfoList() {
    const dom = document.querySelector('.markdown-body') as HTMLElement;
    const stack: MarkdownSummaryInfo[] = [];
    const info: MarkdownSummaryInfo[] = [];
    if (!dom) return info;
    const children = Array.from(dom.children) as HTMLElement[];
    for (const child of children) {
        const tagName = child.tagName.toLowerCase();
        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
            child.id = child.innerText;
            const item: MarkdownSummaryInfo = {
                title: child.innerText,
                dom: child,
                items: [],
            };
            const prevIdx = stack.findLastIndex(v => v.dom.tagName.toLowerCase() === tagName);
            if (prevIdx >= 0) stack.length = prevIdx;
            stack.at(-1)?.items.push(item);
            stack.push(item);
        }
        if (tagName === 'h1') info.push(stack.at(-1)!);
    }
    return info;
}

function MarkdownSummaryItem({ info, level }: { info: MarkdownSummaryInfo; level: number }) {
    return (
        <>
            <li
                className={clsx('mt-0', level === 0 ? `font-semibold` : `pt-2`)}
                style={{ paddingLeft: 10 * level }}
            >
                <a
                    className="cursor-pointer inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                    onClick={e => {
                        e.preventDefault();
                        const dom = document.getElementById(info.title);
                        if (!dom) return;
                        const top = dom.offsetTop;
                        window.scrollTo({
                            behavior: 'smooth',
                            top,
                        });
                    }}
                >
                    {info.title}
                </a>
            </li>
            <ul className="m-0 list-none">
                {info.items.map((v, i) => {
                    return <MarkdownSummaryItem info={v} level={level + 1} key={i} />;
                })}
            </ul>
        </>
    );
}

export function MarkdownSummary() {
    const markdownRendering = useAtomValue(markdownRenderingAtom);
    const [infoList, setInfoList] = React.useState<MarkdownSummaryInfo[]>([]);
    const [isPending, startTransition] = React.useTransition();
    React.useEffect(() => {
        if (!markdownRendering) {
            startTransition(async () => {
                setInfoList(getMarkdownSummaryInfoList());
            });
        }
    }, [markdownRendering]);
    if (!infoList.length) return null;
    return (
        <Spin spinning={isPending} indicator={<LoadingSpinner />}>
            <div className="hidden text-sm xl:block">
                <div className="fixed top-20 h-[calc(100vh-3.5rem)] pt-4 overflow-auto">
                    <ul className="m-0 list-none">
                        {infoList.map((v, i) => (
                            <MarkdownSummaryItem info={v} key={i} level={0} />
                        ))}
                    </ul>
                </div>
            </div>
        </Spin>
    );
}
