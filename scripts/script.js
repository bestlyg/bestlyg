const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function getPrimGens(a) {
  var arr = getGens(a);
  var c = [];
  for (var i = 0; i < arr.length; i++) {
    var t = getGens(arr[i]);
    if (t.length == 0) c.push(arr[i]);
  }
  return c;
}

function getGens(a) {
  var arr = [];
  var n = a / 2 + 1;
  for (var i = 2; i < n; i++) {
    if (a % i == 0) arr.push(i);
  }
  return arr;
}
rl.on('line', function (line) {
  const num = +line;
  const list = getPrimGens(num);
  return list[list.length - 1];
});
