// import { structures } from '../utils';

// const { Heap } = structures;
function nthSuperUglyNumber(n: number, primes: number[]): number {
  const primeLen = primes.length;
  const posArr = new Array(primeLen).fill(0);
  const dataArr: number[] = [1];
  let ans = 0;
  while (dataArr.length < n) {
    ans = dataArr[posArr[0]] * primes[0];
    for (let i = 0; i < primeLen; i++) {
      ans = Math.min(ans, dataArr[posArr[i]] * primes[i]);
    }
    for (let i = 0; i < primeLen; i++) {
      if (ans === dataArr[posArr[i]] * primes[i]) {
        posArr[i]++;
      }
    }
    dataArr.push(ans);
  }
  return ans;
}

console.log(nthSuperUglyNumber(12, [2, 7, 13, 19]));
