const path = require('path');
const net = require('net');
const chalk = require('chalk');
const fs = require('fs-extra');
const args = require('minimist')(process.argv.slice(2));
/**
 * @param {string[]} p
 */
const resolve = (...p) => path.resolve(__dirname, '../', ...p);
const __ENV_DEV__ = process.env.NODE_ENV === 'development';
const __ENV_PROD__ = process.env.NODE_ENV === 'production';
const __TAG_ENV__ = __ENV_DEV__ ? 'dev' : 'prod';
const __TAG_END__ = process.env.TARO_ENV;
const stringify = obj => {
  Object.entries(obj).forEach(([k, v]) => {
    obj[k] = JSON.stringify(v);
  });
  return obj;
};
const pkg = require(resolve('package.json'));
const serviceUrlMap = {
  dev: 'http://localhost:50000/api',
  prod: 'https://www.bestlyg.com/api',
};
const projectConfig = {
  miniprogramRoot: 'dist/',
  projectname: `bestlyg-mobile-${__TAG_END__}-${__TAG_ENV__}`,
  description: 'bestlyg-mobile',
  appid: 'wx6b9481b0fd87dabf',
  setting: {
    urlCheck: !true,
    es6: false,
    postcss: false,
    preloadBackgroundData: false,
    minified: false,
    newFeature: true,
    autoAudits: false,
    coverView: true,
    showShadowRootInWxmlPanel: false,
    scopeDataCheck: false,
    useCompilerModule: false,
  },
  compileType: 'miniprogram',
  simulatorType: 'wechat',
  simulatorPluginLibVersion: {},
  condition: {},
};

function createProjectConfig() {
  fs.writeJSONSync(resolve('project.config.json'), projectConfig);
}
// 检测端口是否被占用
function portIsOccupied(port) {
  // 创建服务并监听该端口
  const server = net.createServer().listen(port);
  return new Promise((resolve, reject) => {
    server.on('listening', function () {
      // 执行这块代码说明端口未被占用
      server.close(); // 关闭服务
      // console.log('The port【' + port + '】 is available.'); // 控制台输出信息
      resolve(true);
    });
    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') {
        // 端口已经被使用
        // console.log('The port【' + port + '】 is occupied, please change other port.');
        resolve(false);
      }
    });
  });
}
async function findNearlyPort(port) {
  let checkPort = false;
  for (; !checkPort; port++) {
    checkPort = await portIsOccupied(port);
  }
  return port;
}
module.exports = {
  resolve,
  stringify,
  __ENV_DEV__,
  __ENV_PROD__,
  __TAG_ENV__,
  __TAG_END__,
  pkg,
  chalk,
  createProjectConfig,
  serviceUrlMap,
  portIsOccupied,
  findNearlyPort,
};
