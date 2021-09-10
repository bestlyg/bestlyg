'use strict';

const Controller = require('egg').Controller;
const QRCode = require('qrcode');

class PublicController extends Controller {
  async uuid() {
    const { ctx } = this;
    ctx.body = ctx.helper.response(null, ctx.helper.uuid());
  }
  async qrcode() {
    const { ctx } = this;
    const { text, ...options } = ctx.query;
    try {
      const data = await QRCode.toDataURL(text, options);
      ctx.body = data;
    } catch (err) {
      ctx.body = helper.response({ code: 999, msg: err.toString() });
    }
  }
}

module.exports = PublicController;
