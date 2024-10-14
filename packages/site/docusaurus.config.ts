import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
    title: '信韵的小奥特',
    tagline: 'welcomme to the world of lucky ultraman.',
    url: 'https:/bestlyg.com',
    baseUrl: process.env.BESTLYG_BASEURL ?? '/web/site',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logo.ico',
    organizationName: 'bestlyg',
    projectName: 'bestlyg',
    i18n: {
        defaultLocale: 'zh-CN',
        locales: ['zh-CN'],
    },
    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // editUrl:
                    //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',

                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                blog: {
                    showReadingTime: true,
                    // editUrl:
                    //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',

                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                    blogSidebarCount: 'ALL',
                },
                theme: {
                    customCss: './src/css/custom.scss',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: 'img/logo.png',
        navbar: {
            title: '信韵的小奥特',
            logo: {
                alt: 'welcomme to the world of lucky ultraman.',
                src: 'img/logo.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'journal',
                    position: 'right',
                    label: 'Journal',
                },
                // {
                //     type: 'doc',
                //     docId: '应用/index',
                //     position: 'right',
                //     label: 'Applications',
                // },
                { to: '/blog', label: 'Record', position: 'right' },
                {
                    type: 'dropdown',
                    label: 'Link',
                    position: 'right',
                    items: [
                        { label: 'About Me', href: '//www.bestlyg.com/web/resume' },
                        { label: 'GitHub', href: 'https://github.com/bestlyg' },
                        { label: 'Gitee', href: 'https://gitee.com/bestlyg' },
                        { label: 'WeChat : bestlyg', href: 'https://wx.qq.com/' },
                        {
                            label: 'QQ',
                            href: 'http://wpa.qq.com/msgrd?v=3&uin=1057966749&site=qq&menu=yes',
                        },
                    ],
                },
            ],
        },
        footer: {
            links: [
                {
                    title: 'Journal',
                    items: [
                        {
                            label: '目录索引',
                            to: '/docs/intro',
                        },
                    ],
                },
            ],
            copyright: `<a href="https://beian.miit.gov.cn/#/Integrated/index">浙ICP备19044645号-1</a> Copyright © ${new Date().getFullYear()} BestLyg.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: [
                'sql',
                'powershell',
                'cpp',
                'python',
                'rust',
                'go',
                'javascript',
                'typescript',
                'jsx',
                'tsx',
                'less',
                'sass',
                'css',
                'json',
                'yaml',
                'toml',
                'bash',
                'diff',
            ],
        },
    } satisfies Preset.ThemeConfig,
    stylesheets: [
        {
            href: 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.13.24/katex.min.css',
            type: 'text/css',
            crossorigin: 'anonymous',
        },
    ],
    plugins: ['docusaurus-plugin-sass'],
};

export default config;
