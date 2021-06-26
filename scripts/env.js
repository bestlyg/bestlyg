var hammingWeight = function (n) {
  let ans = 0;
  for (let i = 0; i <= 31; i++) {
    if ((n >> i) & (1 === 1)) ans++;
  }
  return ans;
};
