const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return true;
  }
  return false;
}
rl.on('line', function (line) {
  line = +line;
  let num1 = 0;
  let num2 = 1;
  while (line !== 0) {
    [num1, num2] = [num2, num1 + num2];
    console.log(num1, num2);
    if (isPrime(num2)) {
      line--;
    }
  }
  console.log(num2);
});
