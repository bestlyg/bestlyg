import React, { useState, useMemo } from 'react';
import { useCreation } from 'ahooks';
import { Button, Col, InputNumber, Row, Card, Empty, Space } from 'antd';
import { random, EPSILON } from './utils';
import { useEffect } from 'react';
import { compute24 as compute24_v1 } from './v1';

const compute24 = compute24_v1;

const getRandomNum = () => new Array(4).fill(0).map(_ => random(1, 10));
export function point24() {
  const [nums, setNums] = useState(getRandomNum());
  const [target, setTarget] = useState(24);
  const [solutions, setSolutions] = useState<string[]>([]);
  const compute = () => {
    setSolutions(compute24(nums, ['+', '-', '*', '/'], target));
  };
  const random = () => {
    setNums(getRandomNum());
    setSolutions([]);
  };
  useEffect(() => {
    console.log('solutions', solutions);
  }, [solutions]);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row gutter={16} style={{ width: 400 }}>
        {nums.map((v, index) => (
          <Col span={6} key={index}>
            <InputNumber
              value={v}
              onChange={e => {
                const newNums = [...nums];
                newNums[index] = e;
                setNums(newNums);
              }}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={16} style={{ width: 400 }}>
        <Col span={6}>
          <InputNumber value={target} onChange={e => setTarget(e)} />
        </Col>
      </Row>
      <Row gutter={16} style={{ width: 400 }}>
        <Col span={6}>
          <Button onClick={compute}>Compute</Button>
        </Col>
        <Col span={6}>
          <Button onClick={random}>Random</Button>
        </Col>
      </Row>
      <Card style={{ width: '100%' }}>
        {solutions.length ? (
          <Row>
            {solutions.map((v, i) => (
              <Col key={i} span={4}>
                {`${v} = ${target}`}
              </Col>
            ))}
          </Row>
        ) : (
          <Empty />
        )}
      </Card>
    </Space>
  );
}
