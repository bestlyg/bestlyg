import { intersection, random } from 'lodash';

const COUNT = 9;
const getBlockIndex = (row: number, col: number) => ~~(row / 3) * 3 + ~~(col / 3);
const getSetList = () => new Array(COUNT).fill(0).map(_ => new Set<number>());
const getIndexList = () =>
  new Array(COUNT).fill(0).map(_ => new Array(COUNT).fill(0).map((_, i) => i + 1));
const getInitBoard: () => number[][] = () =>
  new Array(COUNT).fill(0).map(_ => new Array(COUNT).fill(0));
const getFullBoard = () => {
  const board = getInitBoard();
  const rowsList: number[][] = getIndexList();
  const colsList: number[][] = getIndexList();
  const blocksList: number[][] = getIndexList();
  const setNum = (row: number, col: number) => {
    if (row === COUNT) return true;
    const nextRow = row + +(col === COUNT - 1);
    const nextCol = (col + 1) % COUNT;
    const blockIndex = getBlockIndex(row, col);
    const numList = intersection(rowsList[row], colsList[col], blocksList[blockIndex]);
    while (numList.length > 0) {
      const num = numList.splice(random(0, numList.length - 1), 1)[0];
      rowsList[row] = rowsList[row].filter(v => v !== num);
      colsList[col] = colsList[col].filter(v => v !== num);
      blocksList[blockIndex] = blocksList[blockIndex].filter(v => v !== num);
      board[row][col] = num;
      if (setNum(nextRow, nextCol)) return true;
      rowsList[row].push(num);
      colsList[col].push(num);
      blocksList[blockIndex].push(num);
    }
    return false;
  };
  setNum(0, 0);
  return board;
};
const checkSudoku = (board: number[][]): boolean => {
  const rowSetList = getSetList();
  const colSetList = getSetList();
  const blockSetList = getSetList();
  for (let row = 0; row < COUNT; row++) {
    for (let col = 0; col < COUNT; col++) {
      const num = board[row][col];
      const rowSet = rowSetList[row];
      const colSet = colSetList[col];
      const blockSet = blockSetList[getBlockIndex(row, col)];
      if (!num || rowSet.has(num) || colSet.has(num) || blockSet.has(num)) return false;
      rowSet.add(num);
      colSet.add(num);
      blockSet.add(num);
    }
  }
  return true;
};
