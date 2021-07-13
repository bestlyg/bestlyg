const {
  resolve,
  __TAG_ENV__,
  __TAG_END__,
  __ENV_DEV__,
  __ENV_PROD__,
  stringify,
  pkg,
} = require('./utils');

const config = {
  alias: { '@': resolve('src') },
  projectName: '@bestlyg/mobile',
  date: '2021-7-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${__TAG_ENV__}/${__TAG_END__}`,
  plugins: [],
  defineConstants: stringify({
    __VERSION__: pkg.version,
    __ENV_DEV__,
    __ENV_PROD__,
    __TAG_ENV__,
    __TAG_END__,
  }),
  copy: {
    patterns: [],
    options: {},
  },
  sass: {
    resource: [resolve('src/styles/global.scss')],
  },
  framework: 'react',
  // weapp: {
  //   module: {
  //     postcss: {
  //       autoprefixer: {
  //         enable: true,
  //       },
  //       // 小程序端样式引用本地资源内联配置
  //       url: {
  //         enable: true,
  //         config: {
  //           limit: 10240, // 文件大小限制
  //         },
  //       },
  //     },
  //   },
  // },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};
module.exports = merge => merge({}, config, require(`./${__TAG_ENV__}`));
