// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const bestLygWebpackPlugin = require('./src/plugins/webpack.plugin');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: '信韵的小奥特',
    tagline: '信韵的小奥特',
    url: 'https:/bestlyg.com',
    baseUrl: '/site',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logo.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'bestlyg', // Usually your GitHub org/user name.
    projectName: 'bestlyg', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-CN',
        locales: ['zh-CN'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',

                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',

                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                theme: {
                    customCss: require.resolve('./src/styles/custom.scss'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: '信韵的小奥特',
                logo: {
                    alt: '信韵的小奥特',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'right',
                        label: 'Journal',
                    },
                    // {
                    //   type: 'doc',
                    //   docId: 'leetcode/index',
                    //   position: 'right',
                    //   label: 'LeetCode',
                    // },
                    {
                        type: 'doc',
                        docId: '应用/index',
                        position: 'right',
                        label: 'Applications',
                    },
                    { to: '/blog', label: 'Record', position: 'right' },
                    {
                        type: 'dropdown',
                        label: 'Link',
                        position: 'right',
                        items: [
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
                style: 'dark',
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
                copyright: `<a href="https://beian.miit.gov.cn/#/Integrated/index">浙ICP备19044645号-1</a>Copyright © ${new Date().getFullYear()} BestLyg.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
    plugins: ['docusaurus-plugin-sass', bestLygWebpackPlugin],
    themes: [
        // ... Your other themes.
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                // ... Your options.
                // `hashed` is recommended as long-term-cache of index file is possible.
                hashed: true,
                // For Docs using Chinese, The `language` is recommended to set to:
                // ```
                // language: ["en", "zh"],
                // ```
            }),
        ],
    ],
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],
};

module.exports = config;
