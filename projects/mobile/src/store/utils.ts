import { produce, Draft } from 'immer';
import { setStorage } from '@/utils';

export type ActionMap<Key extends string | number, State> = Record<
  Key,
  (state: Draft<State>, payload?: unknown) => void
>;
/**
 * 根据每个namespace创建actiion
 * @param initialState 初始化数据
 * @param actionMap action映射
 * @param save 是否缓存
 */
export const createAction =
  <Key extends string | number, State>(
    initialState: State,
    actionMap: ActionMap<Key, State>,
    save: boolean = true
  ) =>
  (
    state = initialState,
    action: {
      type: string;
      payload?: unknown;
    }
  ) =>
    produce(state, draftState => {
      actionMap[action.type]?.(draftState, action.payload);
      if (save && actionMap[action.type]) setStorage({ [action.type]: action.payload });
    });
export const formatKey = (namespace: string, Enum: any) => {
  Object.keys(Enum).forEach(k => {
    Enum[k] = `${namespace}/${k}`;
  });
};
