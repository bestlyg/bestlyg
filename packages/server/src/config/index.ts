export const mongo = {
  uri: 'mongodb://www.ehelmet.cn:27017',
  getUri(dbname: string) {
    return `${this.uri}/${dbname}`;
  },
};
