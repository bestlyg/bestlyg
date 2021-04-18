import { lodash } from '@bestlyg/shared';
import { useInterval } from 'ahooks';
import { useState, useEffect, useCallback } from 'react';

const { isString, isNumber, sample } = lodash;
/** 初始数字量 */
export const INIT_COUNT = 10;
export const modeList = [
  { value: 'number', label: '数字' },
  { value: 'string', label: '文本' },
];
export const useLuckyDog = () => {
  /** 设置模式（数字、文本） */
  const [mode, setMode] = useState(modeList[0].value);
  /** 设置数据 */
  const [data, _setData] = useState<string[]>(
    new Array(INIT_COUNT).fill(0).map((_, i) => `${i + 1}`)
  );
  const setData = useCallback(
    (data: number | string) => {
      const arr: string[] = [];
      isString(data) && arr.push(...new Set(data.split(',').filter(v => v !== '')));
      isNumber(data) && arr.push(...new Array(data).fill(0).map((_, i) => `${i + 1}`));
      _setData(arr);
    },
    [_setData]
  );
  /** 当前显示值 */
  const [curValue, setCurValue] = useState<null | string>(null);
  /** 当前启动状态 */
  const [state, _setState] = useState(false);
  /** 当前速度（启动和禁止） */
  const [speed, setSpeed] = useState<null | 0>(null);
  /** 待选中值列表 */
  const [selectList, setSelectList] = useState<string[]>([]);
  /** 已选中值列表 */
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const setState = useCallback(
    (state: boolean) => {
      if (state && selectList.length === 0) return;
      _setState(state);
    },
    [selectList]
  );
  /** 重置 */
  const reset = useCallback(() => {
    setSelectedList([]);
    setSelectList([...data]);
    setSpeed(null);
    setCurValue(null);
  }, [selectedList, selectList]);
  /** 设置轮播 */
  useInterval(() => setCurValue(sample(selectList)), speed);
  /** 模式更改或者数据更改时重置 */
  useEffect(reset, [data, mode]);
  /** 状态值改变时进行设置新列表 */
  useEffect(() => {
    if (state) {
      setSpeed(0);
    } else {
      setSpeed(null);
      if (!curValue) return;
      setSelectList(selectList.filter(v => v !== curValue));
      setSelectedList([...selectedList, curValue]);
    }
  }, [state]);
  useEffect(() => {
    if (selectList.length === 0) {
      setCurValue(null);
    }
  }, [selectList]);
  return { mode, setMode, state, setData, setState, curValue, reset, selectedList, selectList };
};
