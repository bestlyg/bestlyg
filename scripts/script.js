function format(curBoard) {
  let flag = false;
  let n = curBoard.length;
  do {
    flag = false;
    for (let i = 0; i < n - 1; i++) {
      const ball = curBoard[i];
      let start = i;
      let end = i;
      let cnt = 1;
      while (end < n - 1 && ball === curBoard[end + 1]) {
        end++;
        cnt++;
      }
      console.log(i, start, end, curBoard);
      if (cnt < 3) {
        i = end;
        continue;
      }
      curBoard = curBoard.substring(0, start) + curBoard.substring(end + 1);
      n = curBoard.length;
      flag = true;
    }
  } while (flag);
  return curBoard;
}
console.log(format('RBBBRRB'));
