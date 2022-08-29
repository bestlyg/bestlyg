/* eslint-disable */
// url  http://www.bestlyg.com:5870/webhooks
const secret = "BestLyg";
const path = require("path");
const childProcess = require("child_process");
const http = require("http");
const createHandler = require("git-webhook-handler");
const resolve = (p) => path.resolve(__dirname, p);
const handler = createHandler([{ path: "/", secret }]);
function runCmd(cmd, args, callback) {
  const spawn = childProcess.spawn;
  const child = spawn(cmd, args);
  let resp = "";
  child.stdout.on("data", function (buffer) {
    resp += buffer.toString();
  });
  child.stdout.on("end", function () {
    callback(resp);
  });
}

handler.on("error", function (err) {
  console.error("Error:", err.message);
});
handler.on("push", function (event) {
  const path = event.path.substr(1);
  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref
  );
  runCmd("sh", [resolve(`./deploy.sh`)], function (text) {
    console.log(text);
  });
});
try {
  http
    .createServer(function (req, res) {
      handler(req, res, function (err) {
        res.statusCode = 404;
        res.end("no such location");
      });
    })
    .listen(49999);
} catch (err) {
  console.error("Error:", err.message);
}
