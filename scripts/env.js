const arr = [];
const N = 7;
const toBoard = block => {
  const row = N - 1 - ~~((block - 1) / N);
  let col;
  if ((N & 1) === 0) {
    col = (row & 1) === 0 ? N - 1 - ((block - 1) % N) : (block - 1) % N;
  } else {
    col = (row & 1) === 0 ? (block - 1) % N : N - 1 - ((block - 1) % N);
  }
  return [row, col];
};
for (let i = 1; i <= N ** 2; i++) {
  const [row, col] = toBoard(i);
  if (!arr[row]) arr[row] = [];
  arr[row][col] = i;
}
console.log(arr);
