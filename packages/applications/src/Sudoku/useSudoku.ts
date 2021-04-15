import { useEffect, useState, useCallback } from 'react';
import { lodash } from '@bestlyg/shared';
import { useKeyPress } from 'ahooks';

const { random } = lodash;
export const COUNT = 9;
const INDEX_LIST: [number, number][] = [];
for (let i = 0; i < COUNT; i++) {
  for (let j = 0; j < COUNT; j++) {
    INDEX_LIST.push([i, j]);
  }
}
function solveSudoku(board: number[][]): void {
  const getBlockIndex = (row: number, col: number) => ~~(row / 3) * 3 + ~~(col / 3);
  const len = 9;
  const rowSets = new Array(len).fill(0).map(_ => new Set<number>());
  const colSets = new Array(len).fill(0).map(_ => new Set<number>());
  const blockSets = new Array(len).fill(0).map(_ => new Set<number>());
  const emptyArr: [number, number][] = [];
  for (let row = 0; row < len; row++) {
    for (let col = 0; col < len; col++) {
      if (board[row][col] === 0) {
        emptyArr.push([row, col]);
      } else {
        const num = board[row][col];
        rowSets[row].add(num);
        colSets[col].add(num);
        blockSets[getBlockIndex(row, col)].add(num);
      }
    }
  }
  const find = (index: number): boolean => {
    if (index === emptyArr.length) return true;
    const [row, col] = emptyArr[index];
    for (let i = 1; i <= 9; i++) {
      if (rowSets[row].has(i) || colSets[col].has(i) || blockSets[getBlockIndex(row, col)].has(i))
        continue;
      rowSets[row].add(i);
      colSets[col].add(i);
      blockSets[getBlockIndex(row, col)].add(i);
      if (find(index + 1)) {
        board[row][col] = i;
        return true;
      }
      rowSets[row].delete(i);
      colSets[col].delete(i);
      blockSets[getBlockIndex(row, col)].delete(i);
    }
    return false;
  };
  find(0);
}
const getInitBoard: () => number[][] = () =>
  new Array(COUNT).fill(0).map(_ => new Array(COUNT).fill(0));
const getRandomNumber = () => random(1, 9);
export const indexFormat = (i: number, j: number) => `${i}::${j}`;
export const useSudoku = () => {
  const [initCount, setInitCount] = useState(12);
  const [board, setBoard] = useState<number[][]>(getInitBoard());
  const [active, setActive] = useState<[number, number]>([random(0, 8), random(0, 8)]);
  const [fixedIndexSet, setFixedIndexSet] = useState<Set<string>>(new Set());
  const [solutionVisible, setSolutionVisible] = useState(false);
  const init = useCallback(() => {
    const data = [...INDEX_LIST];
    const board = getInitBoard();
    const fixedIndexSet = new Set<string>();
    for (let i = 0; i < initCount; i++) {
      const [row, col] = data.splice(random(0, data.length - 1), 1)[0];
      board[row][col] = getRandomNumber();
      fixedIndexSet.add(indexFormat(row, col));
    }
    setBoard(board);
    setFixedIndexSet(fixedIndexSet);
  }, [initCount, setBoard, setFixedIndexSet]);
  const setNum = useCallback(
    (num: number) => {
      const newBoard = [...board];
      newBoard[active[0]][active[1]] = num;
      setBoard(newBoard);
    },
    [board, setBoard, active]
  );
  useEffect(() => {
    init();
  }, [initCount]);
  useEffect(() => {
    init();
  }, []);
  for (let i = 1; i <= 9; i++) useKeyPress(`${i}`, () => setNum(i));
  return {
    initCount,
    setInitCount,
    board,
    init,
    active,
    setActive,
    fixedIndexSet,
    setNum,
    solutionVisible,
    setSolutionVisible,
  };
};
