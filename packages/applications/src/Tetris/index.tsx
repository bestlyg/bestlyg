import { InputNumber, Space } from 'antd';
import React from 'react';
import { WIDTH_MIN, WIDTH_MAX, HEIGHT_MIN, HEIGHT_MAX, useTetris } from './useTetris';

const Tetris = () => {
  const { canvas, setWidth, setHeight, canvasWidth, canvasHeight } = useTetris();
  return (
    <Space direction="vertical">
      <div>
        宽度(最小{WIDTH_MIN}，最大{WIDTH_MAX})：
        <InputNumber
          min={WIDTH_MIN}
          max={WIDTH_MAX}
          defaultValue={WIDTH_MIN}
          onChange={e => setWidth(e)}
        />
      </div>
      <div>
        高度(最小{HEIGHT_MIN}，最大{HEIGHT_MAX})：
        <InputNumber
          min={HEIGHT_MIN}
          max={HEIGHT_MAX}
          defaultValue={HEIGHT_MIN}
          onChange={e => setHeight(e)}
        />
      </div>
      <canvas width={canvasWidth} height={canvasHeight} ref={canvas}></canvas>
    </Space>
  );
};
export default Tetris;
