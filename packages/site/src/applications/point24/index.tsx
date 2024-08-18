import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, InputNumber, Row, Card, Empty, Space, Radio, Checkbox } from 'antd';
import { random as randomNum, Compute24 } from './utils';
import { compute24 as compute24_v1 } from './v1';
import { compute24 as compute24_v2 } from './v2';
import { compute24 as compute24_v3 } from './v3';

export function Point24() {
    const compute24Fns: { current: Record<string, Compute24> } = useRef({
        v1: compute24_v1,
        v2: compute24_v2,
        v3: compute24_v3,
    });
    const [numCount, setNumCount] = useState(4);
    const getRandomNum = () => new Array(numCount).fill(0).map(_ => randomNum(1, 10));
    const [version, setVersion] = useState('v2');
    const [disabledVersion, setDisabledVersion] = useState([]);
    const [nums, setNums] = useState(getRandomNum());
    const [target, setTarget] = useState(24);
    const [solutions, setSolutions] = useState<string[]>([]);
    const compute = () => {
        const solutions = compute24Fns.current[version](nums, ['+', '-', '*', '/'], target);
        // console.log('===solutions===');
        // console.log(solutions);
        setSolutions(Array.from(new Set(solutions).values()));
        console.log('======TIME COMPARATION======');
        for (const [k, fn] of Object.entries(compute24Fns.current).filter(
            ([k]) => !disabledVersion.some(v => v === k),
        )) {
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
                    onChange={e => setVersion(e.target.value)}
                    value={version}
                    optionType="button"
                    disabled={disabledVersion}
                >
                    {Object.keys(compute24Fns.current).map((v, i) => (
                        <Radio.Button
                            value={v}
                            key={i}
                            disabled={disabledVersion.some(dv => dv === v)}
                        >
                            {v}
                        </Radio.Button>
                    ))}
                </Radio.Group>
                <InputNumber value={numCount} onChange={e => setNumCount(e)} />
            </Space>
            <Space>
                <Checkbox.Group
                    options={Object.keys(compute24Fns.current).map(v => ({ label: v, value: v }))}
                    onChange={e => setDisabledVersion(e)}
                    value={disabledVersion}
                />
            </Space>
            <Space wrap>
                {nums.map((v, index) => (
                    <Col span={12} key={index}>
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
                            <Col key={i} span={24}>
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
