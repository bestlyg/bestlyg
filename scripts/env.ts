function numDecodings(s: string): number {
  const len = s.length;
  const toNum = (c: string) => c.codePointAt(0)! - '0'.codePointAt(0)!;
  const dp = new Array(len + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= len; ++i) {
    if (s[i - 1] !== '0') dp[i] += dp[i - 1];
    if (i > 1 && s[i - 2] !== '0' && toNum(s[i - 2]) * 10 + toNum(s[i - 1]) <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[len];
}
console.log(numDecodings('12'));
/**
 1 1 2 3 
 1 12 3 
 11 2 3 
 11 23 
 1 1 23
 */
