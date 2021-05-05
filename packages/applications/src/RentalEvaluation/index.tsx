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
  BackTop,
} from 'antd';
import React from 'react';
import { Chart, Point, Line, Axis, Area, Tooltip, Coordinate } from 'bizcharts';
import { useRentalEvaluation } from './useRentalEvaluation';
const { Option } = Select;
const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

const RentalEvaluation = () => {
  const {
    rentalIndex,
    setRentalIndex,
    rentalList,
    rentalTitle,
    setRentalTitle,
    onAddRental,
    delOptions,
    delList,
    setDelList,
    onDelRental,
    score,
    reset,
    onEvaluationChange,
    chartData,
    chartScale,
  } = useRentalEvaluation();
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
          options={delOptions}
          value={delList}
          onChange={e => setDelList(e as number[])}
        />
        <Button type="primary" onClick={onDelRental}>
          删除
        </Button>
      </Row>
      <Divider />
      <Statistic title="当前分数" value={score} />
      <Button onClick={reset}>重置</Button>
      <Chart
        height={400}
        data={chartData}
        autoFit
        scale={chartScale}
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
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </Space>
  );
};
export default RentalEvaluation;
