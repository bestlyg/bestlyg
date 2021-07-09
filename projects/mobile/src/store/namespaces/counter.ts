import { createAction, ActionMap, formatKey } from '../utils';

export const counterNamespace = 'counter';
export enum CounterKey {
  /** 添加 */
  ADD,
  /** 增加2 */
  ADD2,
  /** 删除 */
  MINUS,
}
formatKey(counterNamespace, CounterKey);
export interface CounterState {
  num: number;
}
const initialState: CounterState = { num: 0 };
const actionMap: ActionMap<CounterKey, CounterState> = {
  [CounterKey.ADD]: state => state.num++,
  [CounterKey.ADD2]: (state, payload: number) => (state.num += payload),
  [CounterKey.MINUS]: state => state.num--,
};
export const counterAction = createAction<CounterKey, CounterState>(initialState, actionMap);
