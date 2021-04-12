import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import { Button, InputNumber, message, Popconfirm, Row, Space, Statistic } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';
import { SIZE_MIN, useSnake, SIZE_MAX, State } from './useSnake';
import { useScore } from '../../components';
import { Direction } from '../../models';

const SnakeEating = () => {
  const { Tag, setScore, score } = useScore('GAME_SNAKEEATING_');
  const {
    canvas,
    setHeight,
    setWidth,
    canvasHeight,
    canvasWidth,
    drawInit,
    setNextDirection,
    size,
    speed,
    state,
  } = useSnake();
  useEffect(() => {
    setScore(size);
  }, [size]);
  useEffect(() => {
    state === State.end && message.info(`游戏结束，本次分数${score}`);
  }, [state, score]);
  return (
    <Space direction="vertical">
      <div>
        宽度(最小{SIZE_MIN}，最大{SIZE_MAX})：
        <InputNumber
          min={SIZE_MIN}
          max={SIZE_MAX}
          defaultValue={SIZE_MIN}
          onChange={e => setWidth(e)}
        />
      </div>
      <div>
        高度(最小{SIZE_MIN}，最大{SIZE_MAX})：
        <InputNumber
          min={SIZE_MIN}
          max={SIZE_MAX}
          defaultValue={SIZE_MIN}
          onChange={e => setHeight(e)}
        />
      </div>
      {Tag}
      <Space>
        <Statistic title="当前速度" value={`${(speed ?? 0) / 1000}秒 / 步`} />
      </Space>
      <canvas width={canvasWidth} height={canvasHeight} ref={canvas}></canvas>
      <Space direction="vertical" className={styles.op_container}>
        <Row className={`${styles.op} ${styles.op_up}`}>
          <Button
            type="primary"
            onClick={() => setNextDirection(Direction.UP)}
            icon={<UpOutlined />}
          >
            上移
          </Button>
        </Row>
        <Row className={`${styles.op} ${styles.op_lr}`}>
          <Button
            type="primary"
            onClick={() => setNextDirection(Direction.LEFT)}
            icon={<LeftOutlined />}
          >
            左移
          </Button>
          <Button
            type="primary"
            onClick={() => setNextDirection(Direction.RIGHT)}
            icon={<RightOutlined />}
          >
            右移
          </Button>
        </Row>
        <Row className={`${styles.op} ${styles.op_up}`}>
          <Button
            type="primary"
            onClick={() => setNextDirection(Direction.DOWN)}
            icon={<DownOutlined />}
          >
            下移
          </Button>
        </Row>
        <Popconfirm
          title="你真的要重置吗?"
          onConfirm={drawInit}
          okText="要重置"
          cancelText="不要重置"
        >
          <Button type="primary">重置</Button>
        </Popconfirm>
      </Space>
    </Space>
  );
};
export default SnakeEating;
