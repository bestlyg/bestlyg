const getBlock = (row, col) => ~~(row / 3) * 3 + ~~(col / 3);
console.log(getBlock(7, 2));
