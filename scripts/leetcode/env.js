const COUNT = 4;
const check = nums => {
  let isGameOver = true;
  for (let row = 0; row < COUNT; row++) {
    for (let col = 0; col < COUNT; col++) {
      const num = nums[row][col];
      if (
        num === 0 ||
        (col !== COUNT - 1 && num === nums[row][col + 1]) ||
        (row !== COUNT - 1 && num === nums[row + 1][col])
      ) {
        console.log(row, col);
        isGameOver = false;
        break;
      }
    }
    if (!isGameOver) break;
  }
  isGameOver && console.log(`游戏结束，本次分数${score}`);
  return isGameOver;
};
console.log(
  check([
    [2, 4, 64, 4],
    [2, 2, 32, 128],
    [16, 4, 8, 16],
    [2, 8, 2, 4],
  ])
);
