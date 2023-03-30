const fs = require("fs");
const path = require("path");
const resolve = (...p) => path.resolve(__dirname, "../", ...p);

const delay = (t) =>
  new Promise((r) => {
    setTimeout(() => {
      r();
    }, t);
  });

const sendFile = ({ req, res, filepath, delayTime }) => {
  delay(delayTime).then(() => {
    const html = fs.readFileSync(resolve(filepath));
    res
      .status(200)
      .setHeader("content-type", "text/html; charset=UTF-8")
      .setHeader("content-length", html.length)
      .end(html);
  });
};

module.exports = {
  resolve,
  sendFile,
  delay,
};
