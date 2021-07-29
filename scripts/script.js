var trailingZeroes = function (n) {
  let ans = 0;
  let m = 5;
  while (n / m) {
    ans += ~~(n / m);
    m **= 2;
  }
  return ans;
};
