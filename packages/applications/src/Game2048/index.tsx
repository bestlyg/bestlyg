import { Direction } from '@bestlyg/shared';
import { Space, Row, Col, Button, Popconfirm } from 'antd';
import React from 'react';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import { useGame2048, COUNT, getColor } from './useGame2048';
import styles from './index.less';

const Game2048 = () => {
  const { nums, reset, SorceTag, move } = useGame2048();
  return (
    <Space direction="vertical" className={styles.container}>
      {SorceTag}
      <Space direction="vertical">
        {new Array(COUNT).fill(0).map((_, i) => (
          <Row key={i} className={styles.row} gutter={16}>
            {new Array(COUNT).fill(0).map((_, j) => (
              <Col span={6} key={j} className={styles.col}>
                <div
                  className={styles.cell}
                  style={{ backgroundColor: getColor(nums[i][j]).hex() }}
                >
                  {nums[i][j] || ''}
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </Space>
      <Space direction="vertical" className={styles.op_container}>
        <Row className={`${styles.op} ${styles.op_up}`}>
          <Button type="primary" onClick={() => move(Direction.UP)} icon={<UpOutlined />}>
            上移
          </Button>
        </Row>
        <Row className={`${styles.op} ${styles.op_lr}`}>
          <Button type="primary" onClick={() => move(Direction.LEFT)} icon={<LeftOutlined />}>
            左移
          </Button>
          <Button type="primary" onClick={() => move(Direction.RIGHT)} icon={<RightOutlined />}>
            右移
          </Button>
        </Row>
        <Row className={`${styles.op} ${styles.op_up}`}>
          <Button type="primary" onClick={() => move(Direction.DOWN)} icon={<DownOutlined />}>
            下移
          </Button>
        </Row>
        <Popconfirm title="你真的要重置吗?" onConfirm={reset} okText="要重置" cancelText="不要重置">
          <Button type="primary">重置</Button>
        </Popconfirm>
      </Space>
    </Space>
  );
};
export default Game2048;
