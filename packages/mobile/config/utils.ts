import path from "path";
import net from "net";

export const args = require("minimist")(process.argv.slice(2));
/**
 * @param {string[]} p
 */
export const resolve = (...p) => path.resolve(__dirname, "../", ...p);
export const __ENV_DEV__ = process.env.NODE_ENV === "development";
export const __ENV_PROD__ = process.env.NODE_ENV === "production";
export const __TAG_ENV__ = __ENV_DEV__ ? "dev" : "prod";
export const __TAG_END__ = process.env.TARO_ENV;
export const stringify = (obj) => {
  Object.entries(obj).forEach(([k, v]) => {
    obj[k] = JSON.stringify(v);
  });
  return obj;
};
export const pkg = require(resolve("package.json"));
export const serviceUrlMap = {
  dev: "http://localhost:50000/api",
  prod: "https://www.bestlyg.com/api",
};

// 检测端口是否被占用
export function portIsOccupied(port): Promise<boolean> {
  // 创建服务并监听该端口
  const server = net.createServer().listen(port);
  return new Promise((resolve, reject) => {
    server.on("listening", () => {
      // 执行这块代码说明端口未被占用
      server.close(); // 关闭服务
      // console.log('The port【' + port + '】 is available.'); // 控制台输出信息
      resolve(true);
    });
    server.on("error", (err) => {
      if (err.name === "EADDRINUSE") {
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
// module.exports = {
//   resolve,
//   stringify,
//   __ENV_DEV__,
//   __ENV_PROD__,
//   __TAG_ENV__,
//   __TAG_END__,
//   pkg,
//   chalk,
//   createProjectConfig,
//   serviceUrlMap,
//   portIsOccupied,
//   findNearlyPort,
// };
