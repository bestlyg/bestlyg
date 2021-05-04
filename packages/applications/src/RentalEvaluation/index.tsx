import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Chart, Point, Line, Axis, Area, Tooltip, Coordinate } from 'bizcharts';
import {
  InputNumber,
  List,
  Rate,
  Space,
  Statistic,
  Divider,
  Button,
  Select,
  Row,
  Input,
  Checkbox,
} from 'antd';
import { getLocalStorage, setLocalStorage } from '@bestlyg/shared';
const { Option } = Select;
const { Search } = Input;
enum Evaluation {
  距离地铁距离 = '距离地铁距离',
  电动车停放与充电的方便程度 = '电动车停放与充电的方便程度',
  电梯有无 = '电梯有无',
  楼层高度 = '楼层高度',
  '小区周边设施（如快递站，垃圾桶）齐全程度' = '小区周边设施（如快递站，垃圾桶）齐全程度',
  小区环境好不好 = '小区环境好不好',
  房间大不大 = '房间大不大',
  每个房间内无线信号与4G5G信号的强度 = '每个房间内无线信号与4G5G信号的强度',
  水电费收费标准 = '水电费收费标准',
  '其他服务费收取情况（维修费，宽带费）' = '其他服务费收取情况（维修费，宽带费）',
  房租 = '房租',
  距离公司地点远近 = '距离公司地点远近',
}
const StroageTag_RentalEvaluation = 'RentalEvaluation';
interface EvaluationItem {
  item: Evaluation;
  value: number;
  weight: number;
}
interface Rental {
  title: string;
  evaluation: EvaluationItem[];
}
const createInitEvaluation = (): EvaluationItem[] =>
  Object.keys(Evaluation).map(item => ({
    item: item as Evaluation,
    value: 5,
    weight: 1,
  }));
const RentalEvaluation = () => {
  const [chartVisible, setChartVisible] = useState(true);
  const refreshChart = useCallback(() => {
    setChartVisible(false);
    setTimeout(() => setChartVisible(true), 0);
  }, [setChartVisible]);
  const [rentalList, setRentalList] = useState<Rental[]>([
    { title: '默认', evaluation: createInitEvaluation() },
  ]);
  const [rentalIndex, setRentalIndex] = useState<number>(0);
  const checkboxOptions = useMemo(
    () => rentalList.map(({ title }, i) => ({ label: title, value: i })).filter((_, i) => i !== 0),
    [rentalList]
  );
  const [checkboxList, setCheckboxList] = useState<number[]>([]);
  const [rentalTitle, setRentalTitle] = useState('');
  const score = useMemo(
    () =>
      rentalList[rentalIndex].evaluation.reduce(
        (total, { value, weight }) => total + value * weight,
        0
      ),
    [rentalList, rentalIndex]
  );
  const reset = useCallback(() => {
    const list = [...rentalList];
    list[rentalIndex] = {
      ...list[rentalIndex],
      evaluation: createInitEvaluation(),
    };
    setRentalList(list);
    setLocalStorage(StroageTag_RentalEvaluation, JSON.stringify(list));
  }, [setRentalList, rentalList, rentalIndex]);
  const onEvaluationChange = useCallback(
    (value, field, index) => {
      const list = [...rentalList];
      list[rentalIndex].evaluation[index][field] = value;
      setRentalList(list);
      setLocalStorage(StroageTag_RentalEvaluation, JSON.stringify(list));
    },
    [setRentalList, rentalList, rentalIndex]
  );
  const onAddRental = useCallback(() => {
    const list = [...rentalList, { title: rentalTitle, evaluation: createInitEvaluation() }];
    setRentalList(list);
    setRentalIndex(list.length - 1);
    setRentalTitle('');
    setLocalStorage(StroageTag_RentalEvaluation, JSON.stringify(list));
  }, [rentalList, setRentalList, rentalTitle, setRentalTitle]);
  const onDelRental = useCallback(() => {
    const set = new Set(checkboxList);
    const list = rentalList.filter((_, i) => !set.has(i));
    setRentalList(list);
    setRentalIndex(0);
    setRentalTitle('');
    setLocalStorage(StroageTag_RentalEvaluation, JSON.stringify(list));
  }, [rentalList, setRentalList, rentalTitle, setRentalTitle, checkboxList]);
  useEffect(refreshChart, [rentalList]);
  useEffect(() => {
    try {
      const meta = getLocalStorage(StroageTag_RentalEvaluation);
      if (!meta) return;
      const list = JSON.parse(meta) as Rental[];
      setRentalList(list);
    } catch {}
  }, []);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row style={{ alignItems: 'center' }}>
        当前租房：
        <Select style={{ width: 360 }} value={rentalIndex} onChange={e => setRentalIndex(e)}>
          {rentalList.map((rental, i) => (
            <Option key={i} value={i}>
              {rental.title}
            </Option>
          ))}
        </Select>
      </Row>
      <Row style={{ alignItems: 'center' }}>
        添加：
        <Input
          placeholder="添加一条租房信息标题"
          allowClear
          style={{ width: 360 }}
          value={rentalTitle}
          onChange={e => setRentalTitle(e.target.value)}
        />
        <Button type="primary" onClick={onAddRental}>
          添加
        </Button>
      </Row>
      <Row style={{ alignItems: 'center' }}>
        删除：
        <Checkbox.Group
          options={checkboxOptions}
          value={checkboxList}
          onChange={e => setCheckboxList(e as number[])}
        />
        <Button type="primary" onClick={onDelRental}>
          删除
        </Button>
      </Row>
      <Divider />
      <Statistic title="当前分数" value={score} /> <Button onClick={reset}>重置</Button>
      <List
        header={null}
        footer={null}
        bordered
        dataSource={rentalList[rentalIndex].evaluation}
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
                  onChange={e => onEvaluationChange(e, 'value', i)}
                />
              </div>
              <Divider type="vertical" />
              <div>
                权重：
                <InputNumber
                  min={1}
                  value={weight}
                  onChange={e => onEvaluationChange(e, 'weight', i)}
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
          data={rentalList[rentalIndex].evaluation}
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
export default RentalEvaluation;
