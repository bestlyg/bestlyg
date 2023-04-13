const fs = require('fs');
const express = require('express');
const multer = require('multer');
const { sendFile, resolve } = require('./utils');
const cors = express('cors');

const app = express();
app.use(cors);

const upload = multer({ dest: resolve('uploads') });

const port = 3000;
app.all('*', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', req.get('Origin')); // 添加这一行代码，代理配置不成功
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
  );
  next();
});

app.post('/upload/file', upload.single('file'), function (req, res, next) {
  const file = req.file;
  console.log('file', file);
  const sava_path = resolve(`uploads/${file.originalname}`);
  const file_body = fs.readFileSync(resolve(file.path));
  fs.writeFile(sava_path, file_body, (err, data) => {
    console.log('err', err);
    setTimeout(() => {
      res.json({ code: 0, msg: `${file.originalname} upload success` });
    }, 5000);
  });
});

app.get('/styles.css', (req, res) => {
  console.log(req.path);
  sendFile({ req, res, filepath: 'styles.css', delayTime: 300 });
});

app.get('/scripts.js', (req, res) => {
  console.log(req.path);
  sendFile({ req, res, filepath: 'scripts.js', delayTime: 2000 });
});

app.get('/scripts2.js', (req, res) => {
  console.log(req.path);
  sendFile({ req, res, filepath: 'scripts2.js', delayTime: 2000 });
});

app.get('/', (req, res) => {
  console.log(req.path);
  sendFile({ req, res, filepath: 'index.html', delayTime: 0 });
});

// app
//   .route("/book")
//   .get((req, res) => {
//     res.send("Get a random book");
//   })
//   .post((req, res) => {
//     res.send("Add a book");
//   })
//   .put((req, res) => {
//     res.send("Update the book");
//   });

app.listen(port, () => {
  console.log('App listening : ' + port);
});
