import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import React from 'react';
import { markdownRenderingAtom } from '@/components/markdown';
import { sidebarPromiseAtom } from '@/utils';
import _ from 'lodash';

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
                className={clsx('mt-0', level === 1 ? `font-semibold` : `pt-2`)}
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
            <MarkdownSummaryList infoList={info.items} level={level} />
        </>
    );
}

function MarkdownSummaryList({
    infoList,
    level,
}: {
    infoList: MarkdownSummaryInfo[];
    level: number;
}) {
    return (
        <ul className="m-0 list-none">
            {infoList.map((v, i) => (
                <MarkdownSummaryItem info={v} key={i} level={level + 1} />
            ))}
        </ul>
    );
}

export function MarkdownSummary() {
    const { sidebarPromise } = useAtomValue(sidebarPromiseAtom);
    const markdownRendering = useAtomValue(markdownRenderingAtom);
    const [infoList, setInfoList] = React.useState<MarkdownSummaryInfo[]>([]);

    const updateInfoList = _.debounce(() => setInfoList(getMarkdownSummaryInfoList()));

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            updateInfoList();
        });
        observer.observe(document.body, { subtree: true, childList: true, attributes: true });
        return () => {
            observer.disconnect();
        };
    }, [markdownRendering, sidebarPromise]);
    if (!infoList.length) return null;
    return <MarkdownSummaryList infoList={infoList} level={0} />;
}
