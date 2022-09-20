/*
Object.prototype[Symbol.iterator] = function () {
  const list = Object.entries(this);
  let i = 0;
  return { next: () => ({ value: list[i][1], done: i++ === list.length }) };
};
const [a, b, sfad] = { a: 1, b: 2, c: 1234 };
console.log(a, b, sfad);
*/

/*
const cache = {};
function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b);
  }, Math.random() * 1000);
}
async function total() {
  const res1 = await sum(1, 2, 3, 4, 5, 6, 4);
  const res2 = await sum(1, 2, 3, 4, 5, 6, 4);
  return [res1, res2];
}
total().then(res => {
  console.log(res);
});

async function sum(...data) {
  if (data.length === 0) return 0;
  if (data.length === 1) return data[0];
  const [a, b, ...args] = data;
  const k = `${a}+${b}`;
  return new Promise((resolve, reject) => {
    if (cache[k]) {
      resolve(cache[k]);
      return;
    }
    asyncAdd(a, b, (err, v) => {
      if (err) {
        reject(err);
      } else {
        cache[k] = v;
        resolve(v);
      }
    });
  }).then(v => {
    if (args.length === 0) {
      return v;
    } else {
      return sum(v, ...args);
    }
  });
}
*/