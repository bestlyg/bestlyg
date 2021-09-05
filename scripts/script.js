const MAX = 7;
let str = '';
const format = str => str.toString().padEnd(3, ' ');
str += format('');
for (let i = 1; i <= MAX; i++) str += format(i);
console.log(str);
let c = 1;
for (let i = 1; i <= MAX; i++) {
  str = format(i);
  for (let j = 1; j <= MAX; j++) {
    str += format(c++);
  }
  console.log(str);
}
