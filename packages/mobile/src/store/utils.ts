import { produce, Draft } from 'immer';

export type ActionMap<Key extends string | number, State> = Record<
  Key,
  (state: Draft<State>, payload?: unknown) => void
>;
export const createAction =
  <Key extends string | number, State>(initialState: State, actionMap: ActionMap<Key, State>) =>
  (
    state = initialState,
    action: {
      type: string;
      payload?: unknown;
    }
  ) =>
    produce(state, draftState => {
      actionMap[action.type]?.(draftState, action.payload);
    });
export const formatKey = (namespace: string, Enum: any) => {
  Object.keys(Enum).forEach(k => {
    Enum[k] = `${namespace}/${k}`;
  });
};
