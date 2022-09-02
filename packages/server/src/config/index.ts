export const mongo = {
  uri: 'mongodb://www.ehelmet.cn:27017',
  getUri(dbname: string) {
    return `${this.uri}/${dbname}`;
  },
};
export const mailer = {
  host: 'smtp.qq.com',
  user: '1057966749@qq.com',
  pass: 'deyxyhnkyvlwbfde',
};

export const miniprogram = {
  appid: 'wx6b9481b0fd87dabf',
  secret: '44de04908083b1575f0dc59f109912fe',
};

export const jwt = {
  secret: 'bestlyg-server-jet-secret',
};

export { request } from './request';
