import { Button, InputNumber, Space, Statistic } from 'antd';
import React from 'react';
import { WIDTH_MIN, WIDTH_MAX, HEIGHT_MIN, HEIGHT_MAX, useTetris } from './useTetris';

const Tetris = () => {
  const {
    canvas,
    setWidth,
    setHeight,
    canvasWidth,
    canvasHeight,
    score,
    maxScore,
    reset,
    setState,
    state,
  } = useTetris();
  return (
    <Space direction="vertical">
      <div>
        宽度(最小{WIDTH_MIN}，最大{WIDTH_MAX})：
        <InputNumber
          min={WIDTH_MIN}
          max={WIDTH_MAX}
          defaultValue={WIDTH_MIN}
          onChange={e => setWidth(e + 2)}
        />
      </div>
      <div>
        高度(最小{HEIGHT_MIN}，最大{HEIGHT_MAX})：
        <InputNumber
          min={HEIGHT_MIN}
          max={HEIGHT_MAX}
          defaultValue={HEIGHT_MIN}
          onChange={e => setHeight(e + 1)}
        />
      </div>
      <Space>
        <Statistic title="当前分数" value={score} />
        <Statistic title="历史最高" value={maxScore} />
      </Space>
      <canvas width={canvasWidth} height={canvasHeight} ref={canvas}></canvas>
      <Space>
        <Button type="primary" disabled={state} onClick={() => setState(true)}>
          开始
        </Button>
        <Button type="primary" onClick={reset}>
          重置
        </Button>
      </Space>
    </Space>
  );
};
export default Tetris;
