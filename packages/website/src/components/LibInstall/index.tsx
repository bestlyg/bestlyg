import React, { useCallback, useState, useMemo } from 'react';
import { Checkbox, Divider, Row, Radio, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { RadioChangeEvent } from 'antd/lib/radio';

const installModeOptions = [
  { label: 'Yarn', value: 'yarn add' },
  { label: 'TYarn', value: 'tyarn add' },
  { label: 'Npm', value: 'npm i' },
  { label: 'CNpm', value: 'cnpm i' },
];
const depModeOptions = [
  { label: 'prod', value: '-S' },
  { label: 'dev', value: '-D' },
];
interface LibData {
  name: string;
  needType: boolean;
}
const LibInstall = ({ list }: { list: LibData[] }) => {
  const libNameList = useMemo(() => list.map(({ name }) => name), [list]);
  const libMap = useMemo(() => {
    const obj: Record<string, LibData> = {};
    list.forEach(data => {
      obj[data.name] = data;
    });
    return obj;
  }, [list]);
  const [libList, setLibList] = useState<LibData[]>([]);
  const libValue = useMemo(() => libList.map(v => v.name), [libList]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAllLibList, setCheckAllLibList] = useState(false);
  const onLibChange = (e: any[]) => {
    setLibList(e.map(v => libMap[v]));
    setIndeterminate(!!e.length && e.length < list.length);
    setCheckAllLibList(e.length === list.length);
  };
  const onSetAllLibChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    setLibList(checked ? list : []);
    setIndeterminate(false);
    setCheckAllLibList(checked);
  };
  const [installMode, setInstallMode] = useState(installModeOptions[0].value);
  const installModeChange = useCallback(
    (e: RadioChangeEvent) => setInstallMode(e.target.value),
    []
  );
  const [depMode, setDepMode] = useState(depModeOptions[0].value);
  const depModeChange = useCallback((e: RadioChangeEvent) => setDepMode(e.target.value), []);
  return (
    <Space direction="vertical">
      <Row>
        安装工具：
        <Radio.Group
          options={installModeOptions}
          onChange={installModeChange}
          value={installMode}
          optionType="button"
          size="small"
        />
      </Row>
      <Row>
        包依赖关系：
        <Radio.Group
          options={depModeOptions}
          onChange={depModeChange}
          value={depMode}
          optionType="button"
          size="small"
        />
      </Row>
      <Row>包选择：</Row>
      <Row>
        <Space>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onSetAllLibChange}
            checked={checkAllLibList}
          >
            全选
          </Checkbox>
          <Checkbox.Group options={libNameList} value={libValue} onChange={onLibChange} />
        </Space>
      </Row>
      <Divider />
      {libList.length > 0 && (
        <Space direction="vertical">
          <Row>生成代码：</Row>
          <Row>
            包：
            {installMode} {libList.map(v => v.name).join(' ')} {depMode}
          </Row>
          <Row>
            类型：
            {installMode}{' '}
            {libList
              .filter(v => v.needType)
              .map(v => '@types/' + v.name)
              .join(' ')}{' '}
            -D
          </Row>
        </Space>
      )}
    </Space>
  );
};
export default LibInstall;
