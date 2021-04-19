import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { useScore } from '../hooks';
/** 边框最小值 */
export const WIDTH_MIN = 10;
export const WIDTH_MAX = 20;
/** 边框最大值 */
export const HEIGHT_MIN = 20;
export const HEIGHT_MAX = 40;
export const POINT_SIZE = 20;
export const NEXT_BLOCK_WIDTH = 12;
export const NEXT_BLOCK_HEIGHT = 4;
export const NEXT_BLOCK_START_LINE = 2;
export const useTetris = () => {
  const { score, setScore, maxScore } = useScore('Tetris_');
  /** canvasDOM引用 */
  const canvas = useRef<HTMLCanvasElement>(null as any);
  /** 宽度 */
  const [width, setWidth] = useState(WIDTH_MIN);
  /** 高度 */
  const [height, setHeight] = useState(HEIGHT_MIN);
  const containerWidth = useMemo(() => width + 2, [width]);
  const containerHeight = useMemo(() => height + 1, [height]);
  const canvasWidth = useMemo(() => (containerWidth + NEXT_BLOCK_WIDTH + 2) * POINT_SIZE, [
    containerWidth,
  ]);
  const canvasHeight = useMemo(() => containerHeight * POINT_SIZE, [containerHeight]);
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
    ctx.font = 'bold 24px Microsoft YaHei';
    ctx.fillText('NEXT', (containerWidth + 1) * POINT_SIZE, 24);
  }, [containerWidth]);
  const drawWall = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    // 活动区域
    for (let i = 0; i < containerHeight; i++) {
      drawPoint(0, i);
      drawPoint(containerWidth - 1, i);
    }
    for (let i = 0; i < containerWidth; i++) drawPoint(i, containerHeight - 1);
    for (let i = containerWidth + 1; i < containerWidth + NEXT_BLOCK_WIDTH + 1; i++) {
      drawPoint(i, 0 + NEXT_BLOCK_START_LINE);
      drawPoint(i, NEXT_BLOCK_HEIGHT + NEXT_BLOCK_START_LINE + 1);
    }
    for (let i = NEXT_BLOCK_START_LINE; i < NEXT_BLOCK_HEIGHT + NEXT_BLOCK_START_LINE + 2; i++) {
      drawPoint(containerWidth + 1, i);
      drawPoint(containerWidth + NEXT_BLOCK_WIDTH + 1, i);
    }
    ctx.closePath();
  }, [height, width]);
  const drawLine = useCallback(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let i = 0; i < containerWidth + NEXT_BLOCK_WIDTH + 2; i++) {
      ctx.moveTo(i * POINT_SIZE + 0.5, 0);
      ctx.lineTo(i * POINT_SIZE + 0.5, canvasHeight);
      ctx.stroke();
    }
    for (let i = 0; i < containerHeight; i++) {
      ctx.moveTo(0, i * POINT_SIZE + 0.5);
      ctx.lineTo(canvasWidth, i * POINT_SIZE + 0.5);
      ctx.stroke();
    }
    ctx.closePath();
  }, [height, width]);
  const init = useCallback(() => {
    drawClear();
    drawWall();
    drawLine();
    drawText();
  }, [drawPoint, height, width]);
  useEffect(() => {
    init();
  }, [height, width]);
  return { canvas, setWidth, setHeight, canvasWidth, canvasHeight, score, setScore, maxScore };
};
