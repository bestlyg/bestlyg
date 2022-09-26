const isPromise = require('is-promise');
const path = require('path');
const fs = require('fs-extra');
const url = require('url');
/**
 * 通用返回数据
 * @param {Promise<unknown>} response
 * @returns {Promise<unknown>}
 */
function result(response) {
  const res = isPromise(response) ? response : Promise.resolve(response);
  return res.then(
    res => ({ code: 0, data: res }),
    err => ({
      code: 1,
      msg: err + '',
    })
  );
}

/** 根路径 */
const rootpath = path.resolve(__dirname);

/**
 * 获取请求体转换成JSON对象
 * @param {import('http').IncomingHttpHeaders} req
 * @return {Promise<Record<string, any>>}
 */
function resolvePost(req) {
  return new Promise(resolve => {
    let chunk = '';
    req.on('data', data => (chunk += data));
    req.on('end', () => resolve(JSON.parse(chunk)));
  });
}
/**
 * 解析GET url
 * @param {import('http').IncomingHttpHeaders} req
 * @return {Promise<url.UrlWithParsedQuery>}
 */
function resolveGet(req) {
  return new Promise(resolve => {
    resolve(url.parse(req.url, true));
  });
}
/**
 * pipe流
 * @param {string} filepath
 * @param {import('fs').WriteStream} writeStream
 * @param {Promise<boolean>}
 */
function pipeStream(filepath, writeStream) {
  return new Promise(resolve => {
    const readStream = fs.createReadStream(filepath);
    readStream.on('end', () => {
      fs.unlinkSync(filepath);
      resolve(true);
    });
    readStream.pipe(writeStream);
  });
}
/**
 * 合并文件
 * @param {string} dest
 * @param {{filepath: string, size: number}[]} files
 */
function mergerFiles(dest, files) {
  const sum = [0];
  for (const file of files) sum.push(sum[sum.length - 1] + file.size);
  return Promise.all(
    files.map(file =>
      pipeStream(file.filepath, fs.createWriteStream(dest, { start: sum[idx + 1] }))
    )
  );
}
/**
 * 获取已下载文件路径
 * @param {string} dirpath
 */
function getUploadedList(dirpath) {
  return new Promise(resolve => {
    const exist = fs.existsSync(dirpath);
    if (exist) {
      const files = fse.readdirSync(dirPath);
      resolve(files);
    } else {
      resolve([]);
    }
  });
}
/**
 * 获取文件的拓展命
 * @param {string} filename
 * @return {string}
 */
function extractExt(filename) {
  return filename.slice(filename.lastIndexOf('.'), filename.length);
}
/**
 *
 * @param {number} ms
 * @return {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  result,
  rootpath,
  resolvePost,
  resolveGet,
  pipeStream,
  sleep,
  extractExt,
  mergerFiles,
  getUploadedList,
};
