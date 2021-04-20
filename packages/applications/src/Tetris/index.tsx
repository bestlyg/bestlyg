import { Button, InputNumber, Row, Space, Statistic } from 'antd';
import React from 'react';
import { WIDTH_MIN, WIDTH_MAX, HEIGHT_MIN, HEIGHT_MAX, useTetris } from './useTetris';
import styles from './index.less';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import { Direction } from '@bestlyg/shared';

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
    blockCount,
    speed,
    onMove,
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
        <Statistic title="当前块数" value={blockCount} />
        <Statistic title="当前速度" value={`${((speed ?? 0) / 1000).toFixed(2)}秒 / 步`} />
        <Statistic title="当前分数" value={score} />
        <Statistic title="历史最高" value={maxScore} />
      </Space>
      <canvas width={canvasWidth} height={canvasHeight} ref={canvas}></canvas>
      <Space direction="vertical" className={styles.op_container}>
        <Row className={`${styles.op} ${styles.op_up}`}>
          <Button type="primary" onClick={() => onMove(Direction.UP)} icon={<UpOutlined />}>
            上移
          </Button>
        </Row>
        <Row className={`${styles.op} ${styles.op_lr}`}>
          <Button type="primary" onClick={() => onMove(Direction.LEFT)} icon={<LeftOutlined />}>
            左移
          </Button>
          <Button type="primary" onClick={() => onMove(Direction.RIGHT)} icon={<RightOutlined />}>
            右移
          </Button>
        </Row>
        <Row className={`${styles.op} ${styles.op_up}`}>
          <Button type="primary" onClick={() => onMove(Direction.DOWN)} icon={<DownOutlined />}>
            下移
          </Button>
        </Row>
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
