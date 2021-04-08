import { Col, InputNumber, Row, Button, Space, Input, Statistic, message } from 'antd';
import React, { useState, useCallback } from 'react';
import { CalculatorOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.less';
import { usePoint24, MIN, MAX } from './usePoint24';

const checkValReg = /^[\d|()\+\-\*\/]+$/;
const Point24 = () => {
  const { nums, onNumChange, refresh, solutions } = usePoint24();
  const [inputVal, setInputVal] = useState('');
  const [solutionVisible, setSolutionVisible] = useState(false);
  const check = useCallback(() => {
    const val = inputVal.replace(/ /g, '');
    if (!checkValReg.test(val)) {
      message.error(
        `只能输入【+】、【-】、【*】、【/】、【(】、【)】，这六种字符和数字，你好像输了其他的。`
      );
      return;
    }
    solutions.has(val) ? message.success('答对啦！') : message.error('答错啦！');
  }, [solutions, inputVal]);
  return (
    <Space direction="vertical">
      <Row gutter={16} className={styles.inputRow}>
        {nums.map((num, i) => (
          <Col span={6} key={i}>
            <InputNumber
              className={styles.inputNum}
              min={MIN}
              max={MAX}
              value={num}
              onChange={num => onNumChange(num, i)}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={16} className={styles.opRow}>
        <Col span={6}>
          <Button icon={<SyncOutlined />} onClick={refresh}>
            刷新
          </Button>
        </Col>
        <Col span={12}>
          <Input
            placeholder="输入题解，例如【6+(2*6)+6】"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Button type="primary" icon={<CalculatorOutlined />} onClick={check}>
            校验
          </Button>
        </Col>
      </Row>
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
export default Point24;
