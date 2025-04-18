import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from 'antd';
import clsx from 'clsx';
import { compile, compileSync, run, runSync } from '@mdx-js/mdx';
import * as ReactRuntime from 'react/jsx-runtime';
import { BiliBiliIFrame } from '@/components/markdown/bilibili-iframe';
import { Reciter } from '@/components/markdown/reciter';
import rehypeKatex from 'rehype-katex';
import { RandomItem } from '@/components/markdown/render-item';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDirective from 'remark-directive';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { coy as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css/github-markdown.css';
import { atom } from 'jotai';

export const markdownRenderingAtom = atom(false);

function code({ className, ...properties }: SyntaxHighlighterProps) {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
        <SyntaxHighlighter
            language={match[1]}
            PreTag="div"
            style={{ ...codeStyle }}
            {...properties}
        />
    ) : (
        <code className={className} {...properties} />
    );
}

let i = 0;
const A = React.memo(function AMemo() {
    const [c, setC] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setC(c => c + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Button onClick={() => setC(c => c + 1)}>
            123 + {c} + {i++}
        </Button>
    );
});

const MultiAgentRankBar = React.memo(function MultiAgentRankBarMemo() {
    const gridTemplateColumns = 16;
    return (
        <div className="MultiAgentRankBar flex w-full max-w-[480px] flex-col overflow-auto bg-[#E8E8E8]">
            <div
                className="grid w-fit min-w-full border-b border-dashed"
                style={{ gridTemplateColumns: `repeat(${gridTemplateColumns}, 1fr)` }}
            >
                {new Array(gridTemplateColumns).fill(0).map((_, i) => (
                    <div key={i} className={clsx('min-w-[140px] bg-white font-bold')}>
                        <Tooltip placement="top" title={'1'}>
                            <p className="overflow-hidden truncate whitespace-nowrap py-2">
                                {'123123123123123123123123123123'}
                            </p>
                        </Tooltip>
                    </div>
                ))}
                {new Array(gridTemplateColumns).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className="flex min-w-[100px] flex-col justify-start self-center font-mono"
                    >
                        12322
                    </div>
                ))}
                {new Array(gridTemplateColumns).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className="flex min-w-[100px] flex-col justify-start self-center font-mono"
                    >
                        123222
                    </div>
                ))}
            </div>
        </div>
    );
});

async function renderMarkdown(md: string) {
    const compiled = await compile(md, {
        outputFormat: 'function-body',
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkDirective, remarkMath, remarkToc],
        rehypePlugins: [rehypeKatex],
    });
    const mdxModule = await run(compiled, {
        ...ReactRuntime,
    });
    return mdxModule;
}

function renderMarkdownSync(md: string) {
    try {
        const compiled = compileSync(md, {
            outputFormat: 'function-body',
            remarkPlugins: [remarkGfm, remarkFrontmatter, remarkDirective, remarkMath, remarkToc],
            rehypePlugins: [rehypeKatex],
        });
        const mdxModule = runSync(compiled, {
            ...ReactRuntime,
        } as any);
        return mdxModule;
    } catch (_) {
        // ignore
    }
}

class MarkdownErrorBoundary extends React.Component<
    React.PropsWithChildren<{ children: React.ReactNode; latestMountedChildren: React.ReactNode }>,
    { hasError: boolean }
> {
    static getDerivedStateFromError(error: any) {
        console.info('MarkdwonErrorBoundary getDerivedStateFromError', error);
        return { hasError: true, error };
    }

    constructor(props: { children: React.ReactNode; latestMountedChildren: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: any, info: any) {
        console.info('MarkdwonErrorBoundary componentDidCatch', error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.latestMountedChildren;
        }
        return this.props.children;
    }
}

function MarkdownWrapper(props: React.PropsWithChildren<{ onMounted: () => void }>) {
    useEffect(() => {
        props.onMounted();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return props.children;
}

export const Markdown = React.memo(function MarkdownMemo({ md = '' }: { md?: string }) {
    const [mod, setMod] = React.useState<Awaited<ReturnType<typeof renderMarkdown>> | undefined>(
        () => renderMarkdownSync(md)!,
    );
    useEffect(() => {
        renderMarkdown(md).then(
            v => {
                setMod(v);
            },
            err => {
                console.info('===> Render Markdown Error');
                console.error(err);
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [md]);

    const children = mod?.default({
        components: { code, A, MultiAgentRankBar, BiliBiliIFrame, Reciter, RandomItem },
    });
    const [latestMountedChildren, setLatestMountedChildren] = useState<React.ReactNode>(null);
    if (!children) return null;
    return (
        <div className="markdown-body">
            <MarkdownErrorBoundary latestMountedChildren={latestMountedChildren}>
                <MarkdownWrapper
                    onMounted={() => {
                        setLatestMountedChildren(() => children);
                    }}
                >
                    {children}
                </MarkdownWrapper>
            </MarkdownErrorBoundary>
        </div>
    );
});
