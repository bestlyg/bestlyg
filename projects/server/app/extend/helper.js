const uuid = require('uuid');
const stream = require('stream');
class Ws extends stream.Writable {
  constructor(onWirte) {
    super();
    this.onWirte = onWirte;
  }
  _write(data, encoding, done) {
    this.onWirte(data);
    done(null);
  }
}
module.exports = {
  /**
   * 通用响应包
   * @param {any} data
   * @param {{code:number;msg:string}|undefined} err 错误信息
   * @returns {{success:boolean;data:any,code?:number,msg?:string}}
   */
  response(err, data) {
    return {
      success: !err,
      data,
      ...err,
    };
  },
  uuid() {
    return uuid.v4();
  },
  writableStream(onWirte) {
    return new Ws(onWirte);
  },
};
