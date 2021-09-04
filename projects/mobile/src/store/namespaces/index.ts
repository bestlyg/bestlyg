import { combineReducers } from 'redux';
import { counterNamespace, CounterState, CounterKey, counterAction } from './counter';
import { globalNamespace, GlobalState, GlobalKey, globalAction } from './global';

export interface RootKey {
  [counterNamespace]: typeof CounterKey;
  [globalNamespace]: typeof GlobalKey;
}
export interface RootState {
  [counterNamespace]: CounterState;
  [globalNamespace]: GlobalState;
}
export type RootDispatch = (
  fn:
    | ((dispatch: RootDispatch, getState: () => RootState) => void)
    | { type: string | number; payload?: unknown }
) => void;
export const rootReducer = combineReducers({
  [counterNamespace]: counterAction,
  [globalNamespace]: globalAction,
});
export const rootKey: RootKey = {
  [counterNamespace]: CounterKey,
  [globalNamespace]: GlobalKey,
};
