import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, InputNumber, Row, Card, Empty, Space, Radio } from 'antd';
import { useUpdate } from 'ahooks';
import { random as randomNum, Compute24 } from './utils';
import { compute24 as compute24_v1 } from './v1';
import { compute24 as compute24_v2 } from './v2';

export function point24() {
  const update = useUpdate();
  const compute24Fns: { current: Record<string, Compute24> } = useRef({
    v1: compute24_v1,
    v2: compute24_v2,
  });
  useEffect(() => {
    import('./v3').then(res => {
      compute24Fns.current.v3 = (nums, ops, target) =>
        res
          .compute24_wasm(
            nums,
            ops.map(v => v.codePointAt(0)),
            target
          )
          ?.split(',');
      update();
    });
  }, []);
  const [numCount, setNumCount] = useState(4);
  const getRandomNum = () => new Array(numCount).fill(0).map(_ => randomNum(1, 10));
  const [version, setVersion] = useState('v2');
  const [nums, setNums] = useState(getRandomNum());
  const [target, setTarget] = useState(24);
  const [solutions, setSolutions] = useState<string[]>([]);
  const compute = () => {
    const solutions = compute24Fns.current[version](nums, ['+', '-', '*', '/'], target);
    // console.log('===solutions===');
    // console.log(solutions);
    setSolutions(Array.from(new Set(solutions).values()));
    for (const [k, fn] of Object.entries(compute24Fns.current)) {
      console.time(k);
      fn(nums, ['+', '-', '*', '/'], target);
      console.timeEnd(k);
    }
  };
  const random = () => {
    setNums(getRandomNum());
    setSolutions([]);
  };
  // useEffect(() => {
  //   console.log('solutions', solutions);
  // }, [solutions]);
  useEffect(() => {
    random();
  }, [numCount]);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Radio.Group
          options={Object.keys(compute24Fns.current)}
          onChange={e => setVersion(e.target.value)}
          value={version}
          optionType="button"
        />
        <InputNumber value={numCount} onChange={e => setNumCount(e)} />
      </Space>
      <Space wrap>
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
      </Space>
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
