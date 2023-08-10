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

// type ToArray<Num, Arr extends any[] = []> = Num extends Arr['length']
//   ? Arr
//   : ToArray<Num, [1, ...Arr]>;

// type Add<Num1, Num2> = [...ToArray<Num1>, ...ToArray<Num2>]['length'];

// type AddTest1 = Add<12, 7>;
// const addTest1: AddTest1 = 19;

// /* Old */
// // type Subtract<Num1, Num2> = Num2 extends Num1
// //   ? 0
// //   : Add<Num2, 1> extends Num1
// //   ? 1
// //   : Add<1, Subtract<Num1, Add<Num2, 1>>>;
// type Subtract<Num1, Num2> = ToArray<Num1> extends [...nums: ToArray<Num2>, ...rest: infer NextArr]
//   ? NextArr['length']
//   : -1;

// type SubtractTest1 = Subtract<99, 13>;
// const subtractTest1: SubtractTest1 = 86;

// export type NArray<T, N extends number> = N extends N
//   ? number extends N
//     ? T[]
//     : _NArray<T, N, []>
//   : never;
// type _NArray<T, N extends number, R extends unknown[]> = R['length'] extends N
//   ? R
//   : _NArray<T, N, [T, ...R]>;
// type NArrayNumber<L extends number> = NArray<number, L>;

// // 加法
// export type Add<M extends number, N extends number> = [
//   ...NArrayNumber<M>,
//   ...NArrayNumber<N>
// ]['length'];

// // 减法
// export type Subtract<M extends number, N extends number> = NArrayNumber<M> extends [
//   ...x: NArrayNumber<N>,
//   ...rest: infer R
// ]
//   ? R['length']
//   : unknown;

// // 主要用于辅助推导乘除法; 否则会因为 Subtract 返回类型为 number | unknown 报错
// type _Subtract<M extends number, N extends number> = NArrayNumber<M> extends [
//   ...x: NArrayNumber<N>,
//   ...rest: infer R
// ]
//   ? R['length']
//   : -1;

// // 乘法
// type _Multiply<M extends number, N extends number, res extends unknown[]> = N extends 0
//   ? res['length']
//   : _Multiply<M, _Subtract<N, 1>, [...NArray<number, M>, ...res]>;
// export type Multiply<M extends number, N extends number> = _Multiply<M, N, []>;

// // 除法
// type _DivideBy<M extends number, N extends number, res extends unknown[]> = M extends 0
//   ? res['length']
//   : _Subtract<M, N> extends -1
//   ? unknown
//   : _DivideBy<_Subtract<M, N>, N, [unknown, ...res]>;
// export type DividedBy<M extends number, N extends number> = N extends 0
//   ? unknown
//   : _DivideBy<M, N, []>;
