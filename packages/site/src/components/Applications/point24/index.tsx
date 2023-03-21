import React, { useState } from 'react';
import { Button, Col, InputNumber, Row, Card, Empty, Space, Radio } from 'antd';
import { random, Compute24, isEqual as isEqualBase } from './utils';
import { useEffect } from 'react';
import { compute24 as compute24_v1 } from './v1';
import { compute24 as compute24_v2 } from './v2';
import { init, compute24_wasm as compute24_v3 } from './v3';

const compute24Fns: Record<string, Compute24> = {
  v1: compute24_v1,
  v2: compute24_v2,
  v3: (nums, ops, target) =>
    compute24_v3(
      nums,
      ops.map(v => v.codePointAt(0)),
      target
    ).split(','),
};

const getRandomNum = () => new Array(4).fill(0).map(_ => random(1, 10));
export function point24() {
  useEffect(() => {
    init();
  }, []);
  const [version, setVersion] = useState('v2');
  const [nums, setNums] = useState(getRandomNum());
  const [target, setTarget] = useState(24);
  const [solutions, setSolutions] = useState<string[]>([]);
  const compute = () => {
    const solutions = compute24Fns[version](nums, ['+', '-', '*', '/'], target);
    // console.log('===solutions===');
    // console.log(solutions);
    setSolutions(Array.from(new Set(solutions).values()));
    for (const [k, fn] of Object.entries(compute24Fns)) {
      console.time(k);
      fn(nums, ['+', '-', '*', '/'], target);
      console.timeEnd(k);
    }
  };
  const random = () => {
    setNums(getRandomNum());
    setSolutions([]);
  };
  useEffect(() => {
    console.log('solutions', solutions);
  }, [solutions]);
  useEffect(() => {
    random();
  }, [version]);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Radio.Group
        options={Object.keys(compute24Fns)}
        onChange={e => setVersion(e.target.value)}
        value={version}
        optionType="button"
      />
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
              <Col key={i} span={6}>
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
