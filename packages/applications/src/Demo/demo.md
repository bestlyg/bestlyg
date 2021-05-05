---
title: 演示
nav:
  title: 应用合集
  path: /applications
  order: 4
group:
  title: 默认
  path: /default
  order: 1
---

# 演示

演示

## 应用程序

```jsx
/**
 * inline: true
 */
import React from 'react';
import { Demo } from '@bestlyg/applications';
export default Demo;
```

## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/applications/src/Demo/index.tsx)

```ts
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Chart, Point, Line, Axis, Area, Tooltip, Coordinate } from 'bizcharts';
import { InputNumber, List, Rate, Space, Statistic, Divider, Button } from 'antd';
import { getLocalStorage, setLocalStorage } from '@bestlyg/shared';

interface Data {
  item: string;
  value: number;
  weight: number;
}
const createInitData = (): Data[] =>
  [
    '距离地铁距离',
    '电动车停放与充电的方便程度',
    '电梯有无',
    '楼层高度',
    '小区周边设施（如快递站，垃圾桶）齐全程度',
    '小区环境好不好',
    '房间大不大',
    '每个房间内无线信号与4G5G信号的强度',
    '水电费收费标准',
    '其他服务费收取情况（维修费，宽带费）',
    '房租',
    '距离公司地点远近',
  ].map(item => ({
    item,
    value: 5,
    weight: 1,
  }));
const Demo = () => {
  const [chartVisible, setChartVisible] = useState(true);
  const [data, setData] = useState<Data[]>(createInitData());
  const score = useMemo(
    () => data.reduce((total, { value, weight }) => total + value * weight, 0),
    [data]
  );
  const refreshChart = useCallback(() => {
    setChartVisible(false);
    setTimeout(() => setChartVisible(true), 0);
  }, [setChartVisible]);
  const onDataChange = useCallback(
    (value, field, index) => {
      data[index][field] = value;
      setLocalStorage({
        demo: JSON.stringify(data.map(v => JSON.stringify(v))),
      });
      setData([...data]);
      refreshChart();
    },
    [data, setData]
  );
  const reset = useCallback(() => {
    setData(createInitData());
    refreshChart();
  }, [setData]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    let meta = getLocalStorage('demo');
    if (meta) {
      try {
        const newData = JSON.parse(meta).map(v => JSON.parse(v)) as Data[];
        newData.forEach(({ value, weight }, i) => {
          data[i].value = value;
          data[i].weight = weight;
        });
        setData([...data]);
      } catch {}
    }
  }, []);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Statistic title="当前分数" value={score} />
      <Button onClick={reset}>重置</Button>
      <List
        header={null}
        footer={null}
        bordered
        dataSource={data}
        renderItem={({ item, value, weight }, i) => (
          <List.Item key={i} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
              {i + 1} - {item}
            </div>
            <Space>
              <div>
                评分：
                <Rate
                  allowHalf
                  count={10}
                  value={value}
                  onChange={e => onDataChange(e, 'value', i)}
                />
              </div>
              <Divider type="vertical" />
              <div>
                权重：
                <InputNumber
                  min={1}
                  value={weight}
                  onChange={e => onDataChange(e, 'weight', i)}
                  step={0.1}
                />
              </div>
            </Space>
          </List.Item>
        )}
      />
      {chartVisible && (
        <Chart
          height={400}
          data={data}
          autoFit
          scale={{
            value: {
              min: 0,
              max: 10,
            },
          }}
          interactions={['legend-highlight']}
        >
          <Coordinate type="polar" radius={0.8} />
          <Tooltip shared visible={false} />
          <Point position="item*value" shape="circle" />
          <Line position="item*value" size="2" />
          <Area position="item*value" />
          <Axis name="value" grid={{ line: { type: 'line' } }} />
          <Axis
            name="item"
            line={false}
            label={{
              formatter: (text, item, index) =>
                `${index}-${text.length > 3 ? text.substring(0, 3) + '...' : text}`,
            }}
          />
        </Chart>
      )}
    </Space>
  );
};
export default Demo;
```
