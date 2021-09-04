import { createAction, ActionMap, formatKey } from '../utils';

export const globalNamespace = 'global';
export enum GlobalKey {
  /** 设置定位 */
  SET_LOCATION,
}
formatKey(globalNamespace, GlobalKey);
export interface GlobalState {
  location: [number, number];
}
const initialState: GlobalState = { location: [0, 0] };
const actionMap: ActionMap<GlobalKey, GlobalState> = {
  [GlobalKey.SET_LOCATION]: (state, payload: [number, number]) => (state.location = payload),
};
export const globalAction = createAction<GlobalKey, GlobalState>(initialState, actionMap);
