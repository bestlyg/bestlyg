function maxSumSubmatrix(matrix: number[][], k: number): number {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  const dp: number[][] = new Array(rowLen + 1).fill(0).map(_ => new Array(colLen + 1).fill(0));
  let max = -Infinity;
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      let num = matrix[row][col] + dp[row + 1][col] + dp[row][col + 1] - dp[row][col];
      if (num === k) return k;
      dp[row + 1][col + 1] = matrix[row][col] + dp[row + 1][col] + dp[row][col + 1] - dp[row][col];
      for (let i = 0; i <= row; i++) {
        for (let j = 0; j <= col; j++) {
          const areaNum = num - dp[i][col + 1] - dp[row + 1][j] + dp[i][j];
          if (areaNum === k) return k;
          else if (areaNum < k) max = Math.max(max, areaNum);
        }
      }
    }
  }
  return max;
}
console.log(
  maxSumSubmatrix(
    [
      [5, -4, -3, 4],
      [-3, -4, 4, 5],
      [5, 1, 5, -4],
    ],
    8
  )
);
