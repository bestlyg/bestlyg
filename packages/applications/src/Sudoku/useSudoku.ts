import { useEffect, useState, useCallback } from 'react';
import { lodash } from '@bestlyg/shared';
import { useKeyPress } from 'ahooks';

const { random, cloneDeep, intersection } = lodash;
export const COUNT = 9;
const INDEX_LIST: [number, number][] = [];
for (let i = 0; i < COUNT; i++) {
  for (let j = 0; j < COUNT; j++) {
    INDEX_LIST.push([i, j]);
  }
}
const getBlockIndex = (row: number, col: number) => ~~(row / 3) * 3 + ~~(col / 3);
const getSetList = () => new Array(COUNT).fill(0).map(_ => new Set<number>());
const getInitBoard: () => number[][] = () =>
  new Array(COUNT).fill(0).map(_ => new Array(COUNT).fill(0));
const getIndexList = () =>
  new Array(COUNT).fill(0).map(_ => new Array(COUNT).fill(0).map((_, i) => i + 1));
const getFullBoard = () => {
  const board = getInitBoard();
  const rowsList: number[][] = getIndexList();
  const colsList: number[][] = getIndexList();
  const blocksList: number[][] = getIndexList();
  for (let row = 0; row < COUNT; row++) {
    for (let col = 0; col < COUNT; col++) {
      const blockIndex = getBlockIndex(row, col);
      const numList = intersection(rowsList[row], colsList[col], blocksList[blockIndex]);
      console.log(row, col, numList);
      const num = numList[random(0, numList.length - 1)];
      board[row][col] = num;
      rowsList[row] = rowsList[row].filter(v => v !== num);
      colsList[col] = colsList[col].filter(v => v !== num);
      blocksList[blockIndex] = blocksList[blockIndex].filter(v => v !== num);
    }
  }
  return board;
};
export const indexFormat = (i: number, j: number) => `${i}::${j}`;
export const useSudoku = () => {
  const [initCount, setInitCount] = useState(12);
  const [board, setBoard] = useState<number[][]>(getInitBoard());
  const [active, setActive] = useState<[number, number]>([random(0, 8), random(0, 8)]);
  const [fixedIndexSet, setFixedIndexSet] = useState<Set<string>>(new Set());
  const init = useCallback(() => {
    const data = [...INDEX_LIST];
    const board = getFullBoard();
    console.log(board);
    setBoard(board);
  }, [initCount, setBoard, setActive, setFixedIndexSet]);
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
  for (let i = 0; i <= 9; i++) useKeyPress(`${i}`, () => setNum(i));
  return {
    initCount,
    setInitCount,
    board,
    init,
    active,
    setActive,
    fixedIndexSet,
    setNum,
  };
};
