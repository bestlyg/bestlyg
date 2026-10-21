import { createRequire } from 'node:module';
import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import katex from 'katex';
import { expect, it } from '@rstest/core';

it('uses the same KaTeX version for Markdown rendering and the application stylesheet', () => {
    const require = createRequire(import.meta.url);
    const rendererRequire = createRequire(require.resolve('rehype-katex'));
    expect(rendererRequire('katex').version).toBe(katex.version);
    expect(katex.version).toBe('0.19.0');
});

it('renders inline, display and invalid math through the actual MDX plugin chain', async () => {
    const source = 'Inline $x^2 + y^2 = z^2$.\n\n$$\n\\frac{1}{2}\n$$\n\n$\\unknowncommand$';
    const compiled = await compile(source, {
        outputFormat: 'function-body',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    });
    const component = await run(compiled, runtime);
    const html = renderToStaticMarkup(createElement(component.default));
    expect(html).toContain('katex-mathml');
    expect(html).toContain('katex-display');
    expect(html).toContain('<math');
    expect(html).toContain('unknowncommand');
});
