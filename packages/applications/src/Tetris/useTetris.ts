import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { useScore } from '../hooks';
import { lodash, Direction } from '@bestlyg/shared';
import { useKeyPress, useInterval } from 'ahooks';
import { message } from 'antd';

const { random, cloneDeep } = lodash;
/** 宽度最小值 */
export const WIDTH_MIN = 10;
/** 宽度最大值 */
export const WIDTH_MAX = 20;
/** 高度最小值 */
export const HEIGHT_MIN = 20;
/** 高度最大值 */
export const HEIGHT_MAX = 40;
/** 单方块的长宽 */
export const POINT_SIZE = 20;
/** 用于判断，多少块数后进行速度增长 */
const SPEED_INCREASE_BLOCK_COUNT = 20;
/** 速度提升的倍数 */
const SPEED_INCREASE_MULTIPLE = 0.8;
/** NEXT的宽度 */
const NEXT_BLOCK_WIDTH = 8;
/** NEXT的高度 */
const NEXT_BLOCK_HEIGHT = 6;
/** NEXT离画布顶端的格数 */
const NEXT_BLOCK_START_LINE = 2;
/** 块数 */
const BLOCK_COUNT = 7;
/** 块类型 */
enum Block {
  S,
  Z,
  L,
  J,
  I,
  O,
  T,
}
/** 块颜色 */
const BLOCK_COLOR: Record<Block, string> = {
  [Block.I]: '#5cb3cc',
  [Block.J]: '#15559a',
  [Block.S]: '#5dbe8a',
  [Block.Z]: '#c04851',
  [Block.L]: '#f0a1a8',
  [Block.O]: '#e2d849',
  [Block.T]: '#8076a3',
};
/** 生成随机块 */
const getRandomBlock = () => random(0, BLOCK_COUNT - 1) as Block;
/** 分数比例 */
enum Score {
  BOLCK = 10,
  LINE1 = 100,
  LINE2 = 200,
  LINE3 = 400,
  LINE4 = 800,
}
/** 获取活动区域列表 */
const getBlockList = (width: number, height: number) =>
  new Array(height).fill(0).map(_ => new Array(width).fill(null));
/** 旋转后的方向 */
const nextDirectionMap: Record<Direction, Direction> = {
  [Direction.UP]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.DOWN,
  [Direction.DOWN]: Direction.LEFT,
  [Direction.LEFT]: Direction.UP,
};
/** 从当前块进行旋转 */
const changeDirectionMap: Record<
  Block,
  (list: [number, number][], nextDirection: Direction) => [number, number][]
> = {
  [Block.I]: (list, nextDirection) => {
    const startPoint = list[0];
    const ans: [number, number][] = [startPoint];
    const [col, row] = startPoint;
    switch (nextDirection) {
      case Direction.RIGHT:
      case Direction.LEFT: {
        ans.push([col, row - 1], [col, row + 1], [col, row + 2]);
        break;
      }
      case Direction.DOWN:
      case Direction.UP: {
        ans.push([col - 1, row], [col + 1, row], [col + 2, row]);
        break;
      }
    }
    return ans;
  },
  [Block.J]: (list, nextDirection) => {
    const startPoint = list[0];
    const ans: [number, number][] = [startPoint];
    const [col, row] = startPoint;
    switch (nextDirection) {
      case Direction.RIGHT: {
        ans.push([col + 1, row], [col, row + 1], [col, row + 2]);
        break;
      }
      case Direction.LEFT: {
        ans.push([col - 1, row], [col, row - 1], [col, row - 2]);
        break;
      }
      case Direction.DOWN: {
        ans.push([col - 1, row], [col - 2, row], [col, row + 1]);
        break;
      }
      case Direction.UP: {
        ans.push([col, row - 1], [col + 1, row], [col + 2, row]);
        break;
      }
    }
    return ans;
  },
  [Block.L]: (list, nextDirection) => {
    const startPoint = list[0];
    const ans: [number, number][] = [startPoint];
    const [col, row] = startPoint;
    switch (nextDirection) {
      case Direction.RIGHT: {
        ans.push([col + 1, row], [col, row - 1], [col, row - 2]);
        break;
      }
      case Direction.LEFT: {
        ans.push([col - 1, row], [col, row + 1], [col, row + 2]);
        break;
      }
      case Direction.DOWN: {
        ans.push([col + 1, row], [col + 2, row], [col, row + 1]);
        break;
      }
      case Direction.UP: {
        ans.push([col, row - 1], [col - 1, row], [col - 2, row]);
        break;
      }
    }
    return ans;
  },
  [Block.O]: list => cloneDeep(list),
  [Block.S]: (list, nextDirection) => {
    const startPoint = list[0];
    const ans: [number, number][] = [startPoint];
    const [col, row] = startPoint;
    switch (nextDirection) {
      case Direction.RIGHT:
      case Direction.LEFT: {
        ans.push([col, row - 1], [col + 1, row], [col + 1, row + 1]);
        break;
      }
      case Direction.DOWN:
      case Direction.UP: {
        ans.push([col + 1, row], [col, row + 1], [col - 1, row + 1]);
        break;
      }
    }
    return ans;
  },
  [Block.T]: (list, nextDirection) => {
    const startPoint = list[0];
    const ans: [number, number][] = [startPoint];
    const [col, row] = startPoint;
    switch (nextDirection) {
      case Direction.RIGHT: {
        ans.push([col, row - 1], [col, row + 1], [col + 1, row]);
        break;
      }
      case Direction.LEFT: {
        ans.push([col, row - 1], [col, row + 1], [col - 1, row]);
        break;
      }
      case Direction.DOWN: {
        ans.push([col, row + 1], [col + 1, row], [col - 1, row]);
        break;
      }
      case Direction.UP: {
        ans.push([col, row - 1], [col + 1, row], [col - 1, row]);
        break;
      }
    }
    return ans;
  },
  [Block.Z]: (list, nextDirection) => {
    const startPoint = list[0];
    const ans: [number, number][] = [startPoint];
    const [col, row] = startPoint;
    switch (nextDirection) {
      case Direction.RIGHT:
      case Direction.LEFT: {
        ans.push([col, row - 1], [col - 1, row], [col - 1, row + 1]);
        break;
      }
      case Direction.DOWN:
      case Direction.UP: {
        ans.push([col - 1, row], [col, row + 1], [col + 1, row + 1]);
        break;
      }
    }
    return ans;
  },
};
export const useTetris = () => {
  const { score, setScore, maxScore } = useScore('Tetris_');
  /** canvasDOM引用 */
  const canvas = useRef<HTMLCanvasElement>(null as any);
  /** 宽度 */
  const [width, setWidth] = useState(WIDTH_MIN + 2);
  /** 高度 */
  const [height, setHeight] = useState(HEIGHT_MIN + 1);
  /** 块列表，包含颜色值 */
  const [blockList, setBlockList] = useState<(string | null)[][]>(
    getBlockList(WIDTH_MIN, HEIGHT_MIN)
  );
  /** 在块列表进行变化后，判断是否可消行 */
  useEffect(() => {
    let newScore = score;
    const indexList: number[] = [];
    for (let i = blockList.length - 1; i >= 0; i--)
      if (blockList[i].every(v => v !== null)) indexList.push(i);
    const count = indexList.length;
    if (count === 0) return;
    indexList.forEach(i => blockList.splice(i, 1));
    blockList.unshift(...new Array(count).fill(0).map(_ => new Array(width - 2).fill(null)));
    newScore += Score['LINE' + count];
    setBlockList([...blockList]);
    setScore(newScore);
  }, [blockList]);
  const canvasWidth = useMemo(() => (width + NEXT_BLOCK_WIDTH + 1) * POINT_SIZE, [width]);
  const canvasHeight = useMemo(() => height * POINT_SIZE, [height]);
  /** 下一个块类型 */
  const [nextBlock, setNextBlock] = useState<Block>(Block.Z);
  /** 当前块坐标 */
  const [curBlockList, setCurBlockList] = useState<[number, number][] | null>(null);
  /** 当前块类型 */
  const [curBlock, setCurBlock] = useState(Block.I);
  /** 速度 */
  const [speed, setSpeed] = useState<number | null>(null);
  /** 块数 */
  const [blockCount, setBlockCount] = useState(0);
  /** 块数变化时检测倍数提升 */
  useEffect(() => {
    if (speed !== null && blockCount % SPEED_INCREASE_BLOCK_COUNT === 0) {
      setSpeed(speed * SPEED_INCREASE_MULTIPLE);
    }
  }, [blockCount]);
  /** 旋转方向 */
  const [direction, setDirection] = useState<Direction>(Direction.UP);
  /** 初始化块位置 */
  const initBlockMap = useMemo(() => {
    const halfWidth = width / 2;
    const cache: Record<Block, [number, number][]> = {
      [Block.I]: [
        [halfWidth - 2, 0],
        [halfWidth - 3, 0],
        [halfWidth - 1, 0],
        [halfWidth, 0],
      ],
      [Block.J]: [
        [halfWidth - 2, 1],
        [halfWidth - 2, 0],
        [halfWidth - 1, 1],
        [halfWidth, 1],
      ],
      [Block.L]: [
        [halfWidth, 1],
        [halfWidth, 0],
        [halfWidth - 2, 1],
        [halfWidth - 1, 1],
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
        [halfWidth - 1, 1],
        [halfWidth - 1, 0],
        [halfWidth, 1],
        [halfWidth - 2, 1],
      ],
      [Block.Z]: [
        [halfWidth - 1, 0],
        [halfWidth - 2, 0],
        [halfWidth, 1],
        [halfWidth - 1, 1],
      ],
    };
    return cache;
  }, [width, height]);
  /** 游戏状态 */
  const [state, setState] = useState(false);
  /** 游戏结束状态 */
  const [gameOver, setGameOver] = useState(false);
  /** 绘制点 */
  const drawPoint = useCallback((x: number, y: number) => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillRect(x * POINT_SIZE, y * POINT_SIZE, POINT_SIZE, POINT_SIZE);
  }, []);
  /** 清空画布 */
  const drawClear = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
  }, [canvasWidth, canvasHeight]);
  /** 绘制文本 */
  const drawText = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px Microsoft YaHei';
    ctx.fillText('NEXT', (width + 1) * POINT_SIZE, 24);
    ctx.closePath();
  }, [width]);
  /** 绘制墙体和背景 */
  const drawWall = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, POINT_SIZE * width, height * POINT_SIZE);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = '#000';
    for (let i = 0; i < height; i++) {
      drawPoint(0, i);
      drawPoint(width - 1, i);
    }
    for (let i = 0; i < width; i++) drawPoint(i, height - 1);
    ctx.closePath();
  }, [height, width]);
  /** 绘制下一块 */
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
  /** 绘制分割线 */
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
  /** 绘制列表 */
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
  /** 绘制当前下落块 */
  const drawCurBlock = useCallback(() => {
    if (curBlockList === null) return;
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = BLOCK_COLOR[curBlock];
    curBlockList.forEach(([x, y]) => drawPoint(x + 1, y));
    ctx.closePath();
  }, [curBlockList]);
  /** 绘制主函数 */
  const draw = useCallback(() => {
    drawClear();
    drawWall();
    drawBlockList();
    drawNextBlock();
    drawCurBlock();
    drawLine();
    drawText();
  }, [drawClear, drawWall, drawBlockList, drawNextBlock, drawCurBlock, drawLine, drawText]);
  /** 重置 */
  const reset = useCallback(() => {
    setBlockList(getBlockList(width - 2, height - 1));
    setNextBlock(getRandomBlock());
    setState(false);
    setGameOver(false);
    setCurBlockList(null);
    setSpeed(null);
    setScore(0);
    setBlockCount(0);
  }, [drawPoint, height, width, setNextBlock, setState]);
  /** 方向键移动触发，左右移动，下快速下落，上旋转 */
  const onMove = useCallback(
    (moveDirection: Direction) => {
      if (curBlockList === null) return;
      let block = cloneDeep(curBlockList);
      switch (moveDirection) {
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
          while (block.every(([x, y]) => y < height - 2 && blockList[y + 1][x] === null))
            block.forEach((_, i) => block[i][1]++);
          break;
        }
        case Direction.UP: {
          const nextDirection = nextDirectionMap[direction];
          const newBlock = changeDirectionMap[curBlock](block, nextDirection);
          if (
            newBlock.every(
              ([x, y]) =>
                x >= 0 && x < width - 2 && y >= 0 && y < height - 2 && blockList[y][x] === null
            )
          ) {
            setDirection(nextDirection);
            block = newBlock;
          }
          break;
        }
      }
      setCurBlockList(block);
    },
    [curBlockList, curBlock, direction]
  );
  useEffect(() => {
    reset();
  }, [height, width]);
  useEffect(() => {
    if (!state) return;
    if (gameOver) return;
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
    /** 当前块为null时触发 */
    const opNull = () => {
      const block = initBlockMap[nextBlock];
      if (block.some(([x, y]) => blockList[y][x] !== null)) {
        setGameOver(true);
      } else {
        setCurBlock(nextBlock);
        setCurBlockList(block);
        setNextBlock(getRandomBlock());
      }
    };
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
        setBlockCount(blockCount + 1);
        opNull();
      }
    } else {
      opNull();
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
    blockCount,
    speed,
    onMove,
  };
};
