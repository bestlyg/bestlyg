import { combineReducers } from 'redux';
import { counterNamespace, CounterState, CounterKey, counterAction } from './counter';
import { personNamespace, PersonState, PersonKey, personAction } from './person';

export interface RootKey {
  [counterNamespace]: typeof CounterKey;
  [personNamespace]: typeof PersonKey;
}
export interface RootState {
  [counterNamespace]: CounterState;
  [personNamespace]: PersonState;
}
export type RootDispatch = (
  fn:
    | ((dispatch: RootDispatch, getState: () => RootState) => void)
    | { type: string | number; payload?: unknown }
) => void;
export const rootReducer = combineReducers({
  [counterNamespace]: counterAction,
  [personNamespace]: personAction,
});
export const rootKey: RootKey = {
  [counterNamespace]: CounterKey,
  [personNamespace]: PersonKey,
};
