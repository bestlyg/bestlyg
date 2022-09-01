import { anyop, ENV_DEV } from '@/utils';
import { AsyncThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { useSelector, useDispatch } from 'react-redux';

import { counter, person } from './slices';

interface RootState {
  [counter.name]: counter.State;
  [person.name]: person.State;
}

export const names = [counter.name, person.name];

export const actions = {
  [counter.name]: counter.actions,
  [person.name]: person.actions,
};

export const store = configureStore({
  reducer: {
    [counter.name]: counter.slice.reducer,
    [person.name]: person.slice.reducer,
  },
  middleware: getDefaultMiddleware => {
    let middlewares = getDefaultMiddleware() as any;
    if (ENV_DEV) {
      middlewares = middlewares.concat(logger);
    }
    return middlewares;
  },
});

type Dispatch = <T extends any = any>(action: Action | AsyncThunkAction<T, any, any>) => void;

export const getters = (state: RootState) => ({
  counter2: state.counter.data * 2,
});
interface Store<T> {
  state: T;
  dispatch: Dispatch;
  actions: typeof actions;
  getters: ReturnType<typeof getters>;
}
export function useStore<T>(selector: (state: RootState) => T): Store<T>;
export function useStore(): Store<RootState>;
export function useStore<T>(selector?: (state: RootState) => T) {
  const state: RootState = useSelector(anyop);
  return {
    state: (selector ?? anyop)(state),
    dispatch: useDispatch() as Dispatch,
    actions,
    getters: getters(state),
  };
}
export { persist } from './utils';
