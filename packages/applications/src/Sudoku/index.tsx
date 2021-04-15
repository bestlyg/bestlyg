import { Button, Col, InputNumber, Row, Space, Statistic } from 'antd';
import React from 'react';
import { useSudoku, indexFormat, COUNT } from './useSudoku';
import styles from './index.less';
const solutions = new Set<string>();
const Sudoku = () => {
  const {
    initCount,
    setInitCount,
    board,
    active,
    setActive,
    fixedIndexSet,
    init,
    setNum,
    solutionVisible,
    setSolutionVisible,
  } = useSudoku();
  return (
    <Space direction="vertical">
      <div>
        初始化包含数字的个数(1~80)：
        <InputNumber min={1} max={80} defaultValue={initCount} onChange={e => setInitCount(e)} />
      </div>
      <div className={styles.board}>
        {board.map((row, i) => {
          return (
            <div key={i} className={styles.row}>
              {row.map((col, j) => {
                return (
                  <div
                    key={j}
                    className={`${styles.col} ${
                      i === active[0] && j === active[1] ? styles.active : ''
                    } ${fixedIndexSet.has(indexFormat(i, j)) ? styles.fixedIndex : ''}`}
                    onClick={() => fixedIndexSet.has(indexFormat(i, j)) || setActive([i, j])}
                  >
                    {col || ''}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Space className={styles.selectInput}>
        {new Array(COUNT).fill(0).map((_, i) => {
          return (
            <div key={i} className={styles.selectInputItem} onClick={() => setNum(i + 1)}>
              {i + 1}
            </div>
          );
        })}
      </Space>
      <div>
        <Button onClick={init} type="primary">
          刷新
        </Button>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <Space direction="vertical">
            <Statistic title="题解数量" value={solutions.size} />
            {solutions.size > 0 && (
              <Button size="small" onClick={() => setSolutionVisible(!solutionVisible)}>
                {solutionVisible ? '隐藏' : '显示'}题解
              </Button>
            )}
          </Space>
        </Col>
        <Col span={18}>
          {solutionVisible && (
            <Row gutter={16}>
              {[...solutions].map((solution, i) => (
                <Col xl={6} sm={8} key={i}>
                  {solution}
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Space>
  );
};
export default Sudoku;
