Object.prototype[Symbol.iterator] = function () {
  const list = Object.entries(this);
  let i = 0;
  return { next: () => ({ value: list[i][1], done: i++ === list.length }) };
};
const [a, b, sfad] = { a: 1, b: 2, c: 1234 };
console.log(a, b, sfad);
// console.log({ a: 1, b: 2 }[Symbol.iterator]().next());
// const arr = [1, 2, 3];
// const item = arr[Symbol.iterator]();
// console.log(item.next());
