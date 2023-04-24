/**
 *
 * @param src
 * @param dist
 *
 * d : 当前是第几步
 * k : x - y的值
 * x + y == d, x - y == k
 */
// function myers(src: string, dist: string) {
//   const n = src.length + dist.length;
//   const trace: Record<number, Record<number, number>> = {};
//   let i = 0;
//   while (i < src.length && i < dist.length && src[i] == dist[i]) i++;
//   trace[0] = { 0: i };
//   const v: Record<number, number> = { 0: 1 };
//   loop: for (let d = 1; d <= n; d++) {
//     const v = new Map<number, number>();
//     trace[d] = {};
//     for (let k = -d; k <= d; k += 2) {
//       console.log(`=======\nd = ${d}, k = ${k}`);
//       const down = k === -d || (k !== d && v[k + 1] > v[k - 1]);
//       let x = down ? v[k + 1] : v[k - 1] + 1;
//       let y = x - k;
//       while (x < src.length && y < dist.length && src[x] === dist[y]) x++, y++;
//       v[k] = x;
//       trace[d][k] = x;
//       if (x === src.length && y === dist.length) console.log(`down = ${down}, x = ${x}, y = ${y}`);
//     }
//   }
//   console.log(trace);
// }
// const src = 'cbabc';
// const dist = 'abcabba';
// myers(src, dist);

function* a() {
  let result = 0;
  try {
    yield new Promise(res => setTimeout(() => res(11), 100));
    result += yield new Promise(res => res(1));
    console.log('RES', result);
    yield new Promise(res => setTimeout(() => res(22), 100));
    result += yield new Promise(res => res(1));
  } catch (e) {
    console.log('catch', e, result);
    return result;
  }
  return result;
}

function cancellable<T>(generator: Generator<Promise<any>, T, unknown>): [() => void, Promise<T>] {
  let cancel = false;
  const onCancel = () => (cancel = true);
  function dfs(node) {
    if (node.done) return Promise.resolve(node.value);
    if (node.value instanceof Promise)
      return node.value.then(
        res => (cancel ? dfs(generator.throw('Cancelled')) : dfs(generator.next(res))),
        res => dfs(generator.throw(res))
      );
    else return dfs(generator.next(node.value));
  }
  const promise = new Promise<T>((resolve, reject) => {
    dfs(generator.next()).then(resolve, reject);
  });
  return [onCancel, promise];
}

const [cancel, promise] = cancellable(a());
setTimeout(() => {
  cancel();
}, 150);
promise.then(
  res => {
    console.log('res', res);
  },
  err => {
    console.log('Err', err);
  }
);

function cancellable<T>(generator: Generator<Promise<any>, T, unknown>): [() => void, Promise<T>] {
  let cancel = false;
  function dfs(node) {
    if (node.done) return Promise.resolve(node.value);
    if (node.value instanceof Promise)
      return node.value.then(
        res => (cancel ? dfs(generator.throw('Cancelled')) : dfs(generator.next(res))),
        res => dfs(generator.throw(res))
      );
    else return dfs(generator.next(node.value));
  }
  return [
    () => (cancel = true),
    new Promise<T>((resolve, reject) => dfs(generator.next()).then(resolve, reject)),
  ];
}
