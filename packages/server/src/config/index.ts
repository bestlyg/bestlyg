export const mongo = {
  uri: 'mongodb://www.ehelmet.cn:27017',
  getUri(dbname: string) {
    return `${this.uri}/${dbname}`;
  },
};
export const mailer = {
  host: 'smtp.qq.com',
  user: '1057966749@qq.com',
  pass: btoa('uì±Ê\x19äÊùpm÷^'),
};

export const miniprogram = {
  appid: btoa('Ã\x1E\x9B÷\x8F5oGÝó·Zm'),
  secret: btoa('ã\x87^Ó\x8FtóO7o^{åý\x1Ds\x9F_×O}×gÞ'),
};

export const jwt = {
  secret: 'bestlyg-server-jet-secret',
};

export { request } from './request';
