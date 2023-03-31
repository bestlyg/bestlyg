const express = require('express');
const { sendFile } = require('./utils');

const app = express();

const port = 3000;

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
