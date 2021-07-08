import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from './store';
import './app.scss';

const store = getStore();
const App = ({ children }: { children: React.ReactChildren }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default App;
