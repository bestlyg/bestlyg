import { ENV_DEV } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { RootDispatch, rootReducer, RootState } from './namespaces';

const middlewares = [thunkMiddleware];

if (ENV_DEV) {
  middlewares.push(require('redux-logger').createLogger());
}

const enhancer = compose(applyMiddleware(...middlewares));

export const getStore = () => createStore(rootReducer, enhancer);
export * from './namespaces';
export const useStore = (): [RootState, RootDispatch] => {
  const dispatch = useDispatch<RootDispatch>();
  const store = useSelector((state: RootState) => state);
  return [store, dispatch];
};
