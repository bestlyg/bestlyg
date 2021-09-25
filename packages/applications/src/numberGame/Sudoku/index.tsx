import { Button, InputNumber, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useSudoku, indexFormat, COUNT, FULL_COUNT } from './useSudoku';
import styles from './index.less';
const Sudoku = () => {
  const {
    blankCount,
    setBlankCount,
    active,
    setActive,
    init,
    setNum,
    curBoard,
    fixedSet,
    solutionVisible,
    setSolutionVisible,
    fullBoard,
  } = useSudoku();
  return (
    <Space direction="vertical">
      <div>
        初始化包含数字的个数(0~{FULL_COUNT - 1})：
        <InputNumber
          min={0}
          max={FULL_COUNT - 1}
          defaultValue={blankCount}
          onChange={e => setBlankCount(FULL_COUNT - e)}
        />
      </div>
      <div className={styles.board}>
        {curBoard.map((row, i) => (
          <div key={i} className={styles.row}>
            {row.map((col, j) => (
              <div
                key={j}
                className={classnames({
                  [styles.col]: true,
                  [styles.active]: i === active[0] && j === active[1],
                  [styles.fixedIndex]: fixedSet.has(indexFormat(i, j)),
                })}
                onClick={() => fixedSet.has(indexFormat(i, j)) || setActive([i, j])}
              >
                {col || ''}
              </div>
            ))}
          </div>
        ))}
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
      <Row>
        <Button size="small" onClick={() => setSolutionVisible(!solutionVisible)}>
          {solutionVisible ? '隐藏' : '显示'}解法
        </Button>
      </Row>
      <Row>
        {solutionVisible && (
          <div className={styles.board}>
            {fullBoard.map((row, i) => (
              <div key={i} className={styles.row}>
                {row.map((col, j) => (
                  <div
                    key={j}
                    className={classnames({
                      [styles.col]: true,
                      [styles.fixedIndex]: fixedSet.has(indexFormat(i, j)),
                    })}
                  >
                    {col}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </Row>
    </Space>
  );
};
export default Sudoku;
