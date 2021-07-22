// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// function isPrime(n) {
//   for (let i = 2; i < n; i++) {
//     if (n % i === 0) return true;
//   }
//   return false;
// }
// rl.on('line', function (line) {
//   line = +line;
//   let num1 = 0;
//   let num2 = 1;
//   while (line !== 0) {
//     [num1, num2] = [num2, num1 + num2];
//     if (isPrime(num2)) {
//       line--;
//     }
//   }
//   console.log(num2);
// });
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return true;
  }
  return false;
}
const list = [
  8, 21, 34, 55, 144, 377, 610, 987, 2584, 4181, 6765, 10946, 17711, 46368, 75025, 121393, 196418,
  317811, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169,
  63245986, 102334155, 165580141, 267914296, 701408733, 1134903170, 1836311903, 4807526976,
  7778742049, 12586269025, 20365011074, 32951280099, 53316291173, 86267571272, 139583862445,
  225851433717, 365435296162, 591286729879, 956722026041, 1548008755920, 2504730781961,
  4052739537881, 6557470319842,
];
console.log(list.length);
