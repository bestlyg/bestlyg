import { defineConfig } from 'dumi';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

const __DEV__ = process.env.NODE_ENV === 'development';
// config: https://d.umijs.org/config
export default defineConfig({
  base: '/',
  title: '信韵的小奥特',
  favicon: '/assets/logo.ico',
  logo: '/assets/logo.png',
  mode: 'site',
  resolve: {
    includes: [
      'docs',
      'packages/blogs/src',
      'packages/data-structures/src',
      'packages/algorithms/src',
      'packages/applications/src',
      'packages/leetcode/src',
      'packages/resume/src',
    ],
  },
  locales: [['zh-CN', '中文']],
  metas: [
    {
      name: 'keywords',
      content: '信韵,lyg,bestlyg,小奥特',
    },
    {
      name: 'description',
      content: '这是我自己的网站。',
    },
  ],
  navs: [
    null,
    {
      title: '联系索引',
      children: [
        { title: 'GitHub', path: 'https://github.com/bestlyg' },
        { title: 'Gitee', path: 'https://gitee.com/bestlyg' },
        { title: 'WeChat : bestlyg', path: 'https://wx.qq.com/' },
        { title: 'QQ', path: 'http://wpa.qq.com/msgrd?v=3&uin=1057966749&site=qq&menu=yes' },
      ],
    },
  ],
  webpack5: {},
  dynamicImport: {},
  hash: true,
  analyze: {},
  chainWebpack(config, { webpack }) {
    if (__DEV__) return;
    // 生产模式开启
    config.plugin('compression-webpack-plugin').use(
      new CompressionWebpackPlugin({
        // filename: 文件名称，这里我们不设置，让它保持和未压缩的文件同一个名称
        algorithm: 'gzip', // 指定生成gzip格式
        test: new RegExp(`.(${['js', 'css'].join('|')})$`), // 匹配哪些格式文件需要压缩
        threshold: 1024 * 10, //对超过10k的数据进行压缩
        minRatio: 0.6, // 压缩比例，值为0 ~ 1
      })
    );
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
});
