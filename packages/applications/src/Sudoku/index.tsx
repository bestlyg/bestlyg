import { Button, InputNumber, Row, Space } from 'antd';
import React from 'react';
import { useSudoku, indexFormat, COUNT } from './useSudoku';
import styles from './index.less';
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
        {new Array(COUNT + 1).fill(0).map((_, i) => {
          return (
            <div key={i} className={styles.selectInputItem} onClick={() => setNum(i)}>
              {i}
            </div>
          );
        })}
      </Space>
      <div>
        <Button onClick={init} type="primary">
          刷新
        </Button>
      </div>
      {/* <Row>
        <Button size="small" onClick={() => setSolutionVisible(!solutionVisible)}>
          {solutionVisible ? '隐藏' : '显示'}其中一种解法
        </Button>
      </Row>
      <Row>
        {solutionVisible &&
          (solutions ? (
            <div className={styles.board}>
              {solutions.map((row, i) => {
                return (
                  <div key={i} className={styles.row}>
                    {row.map((col, j) => {
                      return (
                        <div
                          key={j}
                          className={`${styles.col} ${
                            fixedIndexSet.has(indexFormat(i, j)) ? styles.fixedIndex : ''
                          }`}
                        >
                          {col}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            '此题无解'
          ))}
      </Row> */}
    </Space>
  );
};
export default Sudoku;
