import React, { useEffect } from 'react';
import { compile, run } from '@mdx-js/mdx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
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
import { atom, useSetAtom } from 'jotai';

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

async function renderMarkdown(md: string) {
    const compiled = await compile(md, {
        outputFormat: 'function-body',
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkDirective, remarkMath, remarkToc],
        rehypePlugins: [rehypeKatex],
    });
    const mdxModule = await run(compiled, {
        jsx,
        jsxs,
        Fragment,
    } as any);
    return mdxModule.default as any as React.FC;
}

export function Markdown({ md = '' }: { md?: string }) {
    const [Content, setContent] = React.useState<React.FC<{ components: Record<string, any> }>>();
    const setMarkdownRendering = useSetAtom(markdownRenderingAtom);
    useEffect(() => {
        setMarkdownRendering(true);
        renderMarkdown(md)
            .then(
                data => {
                    setContent(() => data);
                },
                err => {
                    console.info('===> Render Markdown Error');
                    console.error(err);
                },
            )
            .finally(() => {
                setMarkdownRendering(false);
            });
    }, [md]);

    return (
        <div className="markdown-body">
            {Content && (
                <Content
                    components={{
                        BiliBiliIFrame,
                        Reciter,
                        RandomItem,
                        code,
                    }}
                />
            )}
        </div>
    );
}
