import {
  resolve,
  __TAG_ENV__,
  __TAG_END__,
  __ENV_DEV__,
  __ENV_PROD__,
  stringify,
  pkg,
  serviceUrlMap,
} from "./utils";
import { devConfig } from "./dev";
import { prodConfig } from "./prod";

const config = {
  projectName: "@bestlyg/mobile",
  date: "2024-5-27",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  alias: { "@": resolve("src") },
  sourceRoot: "src",
  plugins: [],
  defineConstants: stringify({
    __VERSION__: pkg.version,
    __ENV_DEV__,
    __ENV_PROD__,
    __TAG_ENV__,
    __TAG_END__,
    __SERVICE_URL__: serviceUrlMap[__TAG_ENV__],
  }),
  sass: {
    resource: [resolve("src/styles/global.scss")],
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  compiler: "webpack5",
  outputRoot: `dist/${__TAG_ENV__}/${__TAG_END__}`,
  cache: {
    enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
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
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

export default (merge) =>
  merge({}, config, __ENV_DEV__ ? devConfig : prodConfig);
