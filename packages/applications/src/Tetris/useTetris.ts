import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { useScore } from '../hooks';
import { lodash, Direction } from '@bestlyg/shared';
import { useKeyPress, useInterval } from 'ahooks';
import { message } from 'antd';

const { random, cloneDeep } = lodash;
/** 边框最小值 */
export const WIDTH_MIN = 10;
export const WIDTH_MAX = 20;
/** 边框最大值 */
export const HEIGHT_MIN = 20;
export const HEIGHT_MAX = 40;
export const POINT_SIZE = 20;
const NEXT_BLOCK_WIDTH = 8;
const NEXT_BLOCK_HEIGHT = 6;
const NEXT_BLOCK_START_LINE = 2;
const BLOCK_COUNT = 7;
enum Block {
  S,
  Z,
  L,
  J,
  I,
  O,
  T,
}
const BLOCK_COLOR: Record<Block, string> = {
  [Block.I]: '#5cb3cc',
  [Block.J]: '#15559a',
  [Block.S]: '#5dbe8a',
  [Block.Z]: '#c04851',
  [Block.L]: '#f0a1a8',
  [Block.O]: '#e2d849',
  [Block.T]: '#8076a3',
};
const getRandomBlock = () => random(0, BLOCK_COUNT - 1) as Block;
enum Score {
  BOLCK = 10,
  LINE1 = 100,
  LINE2 = 200,
  LINE3 = 400,
  LINE4 = 800,
}
const getBlockList = (width: number, height: number) =>
  new Array(height).fill(0).map(_ => new Array(width).fill(null));
export const useTetris = () => {
  const { score, setScore, maxScore } = useScore('Tetris_');
  /** canvasDOM引用 */
  const canvas = useRef<HTMLCanvasElement>(null as any);
  /** 宽度 */
  const [width, setWidth] = useState(WIDTH_MIN + 2);
  /** 高度 */
  const [height, setHeight] = useState(HEIGHT_MIN + 1);
  const [blockList, setBlockList] = useState<(string | null)[][]>(
    getBlockList(WIDTH_MIN, HEIGHT_MIN)
  );
  useEffect(() => {
    let startI = -1;
    let count = 0;
    for (let i = blockList.length - 1; i >= 0; i--) {
      if (blockList[i].every(v => v !== null)) {
        if (startI === -1) startI = i;
        count++;
      } else if (startI !== -1) break;
    }
    if (startI === -1) return;
    blockList.splice(startI, count);
    blockList.unshift(...new Array(count).fill(0).map(_ => new Array(width - 2).fill(null)));
    setScore(score + Score['LINE' + count]);
  }, [blockList]);
  const canvasWidth = useMemo(() => (width + NEXT_BLOCK_WIDTH + 1) * POINT_SIZE, [width]);
  const canvasHeight = useMemo(() => height * POINT_SIZE, [height]);
  const [nextBlock, setNextBlock] = useState<Block>(Block.Z);
  const [curBlockList, setCurBlockList] = useState<[number, number][] | null>(null);
  const [curBlock, setCurBlock] = useState(Block.I);
  const [speed, setSpeed] = useState<number | null>(null);
  const initBlockMap = useMemo(() => {
    const halfWidth = width / 2;
    const cache: Record<Block, [number, number][]> = {
      [Block.I]: [
        [halfWidth - 3, 0],
        [halfWidth - 2, 0],
        [halfWidth - 1, 0],
        [halfWidth, 0],
      ],
      [Block.J]: [
        [halfWidth - 2, 0],
        [halfWidth - 2, 1],
        [halfWidth - 1, 1],
        [halfWidth, 1],
      ],
      [Block.L]: [
        [halfWidth, 0],
        [halfWidth - 2, 1],
        [halfWidth - 1, 1],
        [halfWidth, 1],
      ],
      [Block.O]: [
        [halfWidth - 2, 0],
        [halfWidth - 1, 0],
        [halfWidth - 2, 1],
        [halfWidth - 1, 1],
      ],
      [Block.S]: [
        [halfWidth - 1, 0],
        [halfWidth, 0],
        [halfWidth - 2, 1],
        [halfWidth - 1, 1],
      ],
      [Block.T]: [
        [halfWidth - 1, 0],
        [halfWidth, 1],
        [halfWidth - 2, 1],
        [halfWidth - 1, 1],
      ],
      [Block.Z]: [
        [halfWidth - 1, 0],
        [halfWidth, 1],
        [halfWidth - 2, 0],
        [halfWidth - 1, 1],
      ],
    };
    return cache;
  }, [width, height]);
  const [state, setState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const drawPoint = useCallback((x: number, y: number) => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillRect(x * POINT_SIZE, y * POINT_SIZE, POINT_SIZE, POINT_SIZE);
  }, []);
  const drawClear = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
  }, [canvasWidth, canvasHeight]);
  const drawText = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px Microsoft YaHei';
    ctx.fillText('NEXT', (width + 1) * POINT_SIZE, 24);
    ctx.closePath();
  }, [width]);
  const drawWall = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = '#000';
    for (let i = 0; i < height; i++) {
      drawPoint(0, i);
      drawPoint(width - 1, i);
    }
    for (let i = 0; i < width; i++) drawPoint(i, height - 1);
    ctx.closePath();
  }, [height, width]);
  const drawNextBlock = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = '#000';
    for (let i = width + 1; i < width + NEXT_BLOCK_WIDTH; i++) {
      drawPoint(i, NEXT_BLOCK_START_LINE);
      drawPoint(i, NEXT_BLOCK_START_LINE + NEXT_BLOCK_HEIGHT - 1);
    }
    for (let i = NEXT_BLOCK_START_LINE; i < NEXT_BLOCK_HEIGHT + NEXT_BLOCK_START_LINE; i++) {
      drawPoint(width + 1, i);
      drawPoint(width + NEXT_BLOCK_WIDTH, i);
    }
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = BLOCK_COLOR[nextBlock];
    switch (nextBlock) {
      case Block.I: {
        for (let i = 0; i < 4; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 1 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2)
          );
        }
        break;
      }
      case Block.J: {
        drawPoint(
          width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 1,
          NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2) - 1
        );
        for (let i = 0; i < 3; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 1 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2)
          );
        }
        break;
      }
      case Block.L: {
        drawPoint(
          width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 1 + 3,
          NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2) - 1
        );
        for (let i = 0; i < 3; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 2 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2)
          );
        }
        break;
      }
      case Block.O: {
        for (let i = 0; i < 2; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 2 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2) - 1
          );
        }
        for (let i = 0; i < 2; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 2 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2)
          );
        }
        break;
      }
      case Block.Z: {
        for (let i = 0; i < 2; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 2 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2) - 1
          );
        }
        for (let i = 0; i < 2; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 3 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2)
          );
        }
        break;
      }
      case Block.S: {
        for (let i = 0; i < 2; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 2 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2) - 1
          );
        }
        for (let i = 0; i < 2; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 1 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2)
          );
        }
        break;
      }
      case Block.T: {
        drawPoint(
          width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 1 + 1,
          NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2) - 1
        );
        for (let i = 0; i < 3; i++) {
          drawPoint(
            width + 1 + (NEXT_BLOCK_WIDTH - 4 - 2) / 2 + 1 + i,
            NEXT_BLOCK_START_LINE + ~~(NEXT_BLOCK_HEIGHT / 2)
          );
        }
        break;
      }
    }
    ctx.closePath();
  }, [width, nextBlock]);
  const drawLine = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let i = 0; i < width + NEXT_BLOCK_WIDTH + 2; i++) {
      ctx.moveTo(i * POINT_SIZE + 0.5, 0);
      ctx.lineTo(i * POINT_SIZE + 0.5, canvasHeight);
      ctx.stroke();
    }
    for (let i = 0; i < height; i++) {
      ctx.moveTo(0, i * POINT_SIZE + 0.5);
      ctx.lineTo(canvasWidth, i * POINT_SIZE + 0.5);
      ctx.stroke();
    }
    ctx.closePath();
  }, [height, width]);
  const drawBlockList = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    for (let row = 0; row < height - 1; row++)
      for (let col = 0; col < width - 2; col++)
        if (blockList[row][col] !== null) {
          ctx.beginPath();
          ctx.fillStyle = blockList[row][col];
          drawPoint(col + 1, row);
          ctx.closePath();
        }
  }, [width, height, blockList]);
  const drawCurBlock = useCallback(() => {
    if (curBlockList === null) return;
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = BLOCK_COLOR[curBlock];
    curBlockList.forEach(([x, y]) => drawPoint(x + 1, y));
    ctx.closePath();
  }, [curBlockList]);
  const draw = useCallback(() => {
    drawClear();
    drawWall();
    drawBlockList();
    drawNextBlock();
    drawCurBlock();
    drawLine();
    drawText();
  }, [drawClear, drawWall, drawBlockList, drawNextBlock, drawCurBlock, drawLine, drawText]);
  const reset = useCallback(() => {
    setBlockList(getBlockList(width - 2, height - 1));
    setNextBlock(getRandomBlock());
    setState(false);
    setGameOver(false);
    setCurBlockList(null);
    setSpeed(null);
    setScore(0);
  }, [drawPoint, height, width, setNextBlock, setState]);
  const onMove = useCallback(
    (direction: Direction) => {
      if (curBlockList === null) return;
      const block = cloneDeep(curBlockList);
      switch (direction) {
        case Direction.LEFT: {
          if (block.every(([x, y]) => x >= 1 && blockList[y][x - 1] === null)) {
            block.forEach((_, i) => block[i][0]--);
          }
          break;
        }
        case Direction.RIGHT: {
          if (block.every(([x, y]) => x < width - 2 && blockList[y][x + 1] === null)) {
            block.forEach((_, i) => block[i][0]++);
          }
          break;
        }
        case Direction.DOWN: {
          while (block.every(([x, y]) => y + 1 < height - 1 && blockList[y + 1][x] === null))
            block.forEach((_, i) => block[i][1]++);
          break;
        }
        case Direction.UP: {
          switch (curBlock) {
            case Block.I: {
              break;
            }
            case Block.J: {
              break;
            }
            case Block.L: {
              break;
            }
            case Block.O: {
              break;
            }
            case Block.S: {
              break;
            }
            case Block.T: {
              break;
            }
            case Block.Z: {
              break;
            }
          }
          break;
        }
      }
      setCurBlockList(block);
    },
    [curBlockList, curBlock]
  );
  useEffect(() => {
    reset();
  }, [height, width]);
  useEffect(() => {
    if (!state) return;
    const block = initBlockMap[nextBlock];
    setCurBlockList(block);
    setCurBlock(nextBlock);
    setNextBlock(getRandomBlock());
    setSpeed(1000);
  }, [state]);
  useEffect(() => {
    if (gameOver) {
      setState(false);
      setSpeed(null);
      message.info(`游戏结束，本次获得${score}分`);
    }
  }, [gameOver]);
  useEffect(draw, [blockList, nextBlock, curBlockList, curBlock]);
  useInterval(() => {
    if (curBlockList) {
      if (curBlockList.every(([x, y]) => y + 1 < height - 1 && blockList[y + 1][x] === null)) {
        const block = cloneDeep(curBlockList);
        block.forEach((_, i) => block[i][1]++);
        setCurBlockList(block);
      } else {
        setCurBlockList(null);
        const color = BLOCK_COLOR[curBlock];
        curBlockList.forEach(([x, y]) => (blockList[y][x] = color));
        setBlockList([...blockList]);
        setScore(score + Score.BOLCK * 4);
      }
    } else {
      const block = initBlockMap[nextBlock];
      if (block.some(([x, y]) => blockList[y][x] !== null)) {
        setGameOver(true);
      } else {
        setCurBlock(nextBlock);
        setCurBlockList(block);
        setNextBlock(getRandomBlock());
      }
    }
  }, speed);
  Object.values(Direction).forEach(v => {
    useKeyPress(v, e => {
      e.preventDefault();
      onMove(v);
    });
  });
  return {
    canvas,
    setWidth,
    setHeight,
    canvasWidth,
    canvasHeight,
    score,
    setScore,
    maxScore,
    reset,
    state,
    setState,
  };
};
