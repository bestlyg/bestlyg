import { Card, Row, Space, Input, Col } from 'antd';
import React, { useState, useMemo } from 'react';
import { THREE } from '@bestlyg/webgl';

function TransformColor() {
  const [input, setInput] = useState('#FEE140');
  const color = useMemo(() => new THREE.Color(input), [input]);
  return (
    <Card title="颜色转换">
      <Space direction="vertical">
        <Row>简介：转化十六进制颜色、CSS颜色、HSL颜色为WebGL颜色。</Row>
        <Space>
          输入颜色类型:
          <Input value={input} onChange={e => setInput(e.target.value)} />
        </Space>
        <Row>
          <Col span={6}>R:</Col>
          <Col span={18}>{color.r}</Col>
        </Row>
        <Row>
          <Col span={6}>G:</Col>
          <Col span={18}>{color.g}</Col>
        </Row>
        <Row>
          <Col span={6}>B:</Col>
          <Col span={18}>{color.b}</Col>
        </Row>
      </Space>
    </Card>
  );
}
export default function WebGLUtils() {
  return (
    <Space>
      <TransformColor />
    </Space>
  );
}
