const axios = require('axios');

const instance = new axios.Axios({
  baseURL: 'http://127.0.0.1:8000',
});

instance
  .request({
    url: '/test',
    method: 'get',
    data: '123',
  })
  .then(
    res => {
      console.log(res);
    },
    err => {
      console.log('err');
      console.log(err);
    }
  );
