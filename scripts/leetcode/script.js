let a = 1,
  b = 2;
const arr1 = [3, 4, 5];
const arr2 = [a, b, ...arr1];
[a, b] = arr1;
console.log(a, b, arr2);
