import { Button, Col, Input, InputNumber, Radio, Row, Space } from 'antd';
import React from 'react';
import { useLuckyDog, modeList, INIT_COUNT } from './useLuckyDog';
import styles from './index.less';

const LuckyDog = () => {
  const { mode, setMode, state, setData, setState, curValue, reset, selectedList, selectList } =
    useLuckyDog();
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space direction="vertical">
        <Space className={styles.mode}>
          抽奖模式
          <Radio.Group value={mode} onChange={e => setMode(e.target.value)} buttonStyle="solid">
            {modeList.map(({ value, label }, i) => (
              <Radio.Button key={i} value={value}>
                {label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Space>
        {mode === 'number' && (
          <Space>
            请输入数字的最大值(1~1000)：
            <InputNumber
              min={1}
              max={1000}
              defaultValue={INIT_COUNT}
              onChange={e => e && setData(e)}
            />
          </Space>
        )}
        {mode === 'string' && (
          <Space direction="vertical">
            请输入文本(利用【,】进行分割)
            <Input.TextArea
              rows={4}
              showCount={true}
              autoSize={{ minRows: 2, maxRows: 6 }}
              allowClear={true}
              onChange={e => e && setData(e.target.value)}
            />
          </Space>
        )}
      </Space>
      <div className={styles.body}>{curValue ?? '等待开始'}</div>
      <Space>
        <Button type="primary" onClick={() => setState(!state)}>
          {state ? '暂停' : '开始'}
        </Button>
        <Button type="primary" onClick={reset}>
          重置
        </Button>
      </Space>
      <Row>当前选中列表</Row>
      <Row gutter={[16, 16]}>
        {selectedList.map((v, i) => (
          <Col key={i} xs={8} sm={6} md={4} lg={3}>
            {i + 1} - {v}
          </Col>
        ))}
      </Row>
      <Row>暂未选中列表</Row>
      <Row gutter={[16, 16]}>
        {selectList.map((v, i) => (
          <Col key={i} xs={8} sm={6} md={4} lg={3}>
            {i + 1} - {v}
          </Col>
        ))}
      </Row>
    </Space>
  );
};
export default LuckyDog;
