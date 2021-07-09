import { createAction, ActionMap, formatKey } from '../utils';

export const personNamespace = 'person';
export enum PersonKey {
  /** 添加 */
  SET_NAME,
  /** 增加2 */
  SET_AGE,
}
formatKey(personNamespace, PersonKey);
export interface PersonState {
  name: string;
  age: number;
}
const initialState: PersonState = { name: '', age: 0 };
const actionMap: ActionMap<PersonKey, PersonState> = {
  [PersonKey.SET_NAME]: (state, payload: string) => (state.name = payload),
  [PersonKey.SET_AGE]: (state, payload: number) => (state.age = payload),
};
export const personAction = createAction<PersonKey, PersonState>(initialState, actionMap);
