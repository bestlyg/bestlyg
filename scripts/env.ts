function isScramble(s1: string, s2: string): boolean {
  const len = s1.length;
  // 从s1的i下标开始，从s2的j下标开始，k个长度是否匹配
  const dp: boolean[][][] = new Array(len)
    .fill(0)
    .map(_ => new Array(len).fill(0).map(_ => new Array(len + 1).fill(false)));
  for (let i = 0; i < len; i++) for (let j = 0; j < len; j++) dp[i][j][1] = s1[i] === s2[j];
  // 匹配的长度
  for (let k = 2; k <= len; k++) {
    const mixIndex = len - k + 1;
    // s1的下标
    for (let i = 0; i < mixIndex; i++) {
      // s2的下标
      for (let j = 0; j < mixIndex; j++) {
        // 截取的位置
        for (let sp = 1; sp < k && !dp[i][j][k]; sp++) {
          dp[i][j][k] =
            (dp[i][j][sp] && dp[i + sp][j + sp][k - sp]) ||
            (dp[i][j + k - sp][sp] && dp[i + sp][j][k - sp]);
        }
      }
    }
  }
  return dp[0][0][len];
}
// console.log(isScramble('great', 'rgeat'));
console.log(isScramble('abb', 'bba'));
