const { fs, resolve, _ } = require('./utils');

main();
function main() {
  const stores = fs
    .readdirSync(resolve('src/store/slices'))
    .filter(v => v !== 'index.ts')
    .map(v => v.split('.')[0]);
  console.log(`stores : ${stores.join(',')}`);
  createSlicesIndex(stores);
  createStoreIndex(stores);
  console.log('store create success');
}

function createSlicesIndex(stores) {
  const template = stores.map(name => `export * as ${name} from './${name}';`).join('\n');
  fs.writeFileSync(resolve('src/store/slices/index.ts'), template);
}
function createStoreIndex(stores) {
  const template = `import { anyop, ENV_DEV } from '@/utils';
import { AsyncThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { useSelector, useDispatch } from 'react-redux';

${createImport()}

${createRootState()}

${createNames()}

${createActions()}

${createStore()}

type Dispatch = <T extends any = any>(action: Action | AsyncThunkAction<T, any, any>) => void;
interface Store<T> {
  state: T;
  dispatch: Dispatch;
  actions: typeof actions;
}
export function useStore<T>(selector: (state: RootState) => T): Store<T>;
export function useStore(): Store<RootState>;
export function useStore<T>(selector?: (state: RootState) => T) {
  return {
    state: useSelector(selector ?? anyop),
    dispatch: useDispatch() as Dispatch,
    actions,
  };
}
export * as utils from './utils';
`;
  fs.writeFileSync(resolve('src/store/index.ts'), template);
  function createImport() {
    return `import { ${stores.join(', ')} } from './slices';`;
  }
  function createRootState() {
    return [
      `interface RootState {`,
      ...stores.map(name => `  [${name}.name]: ${name}.State;`),
      `}`,
    ].join('\n');
  }
  function createNames() {
    return `export const names = [${stores.map(name => `${name}.name`).join(', ')}];`;
  }
  function createActions() {
    return [
      `export const actions = {`,
      ...stores.map(name => `  [${name}.name]: ${name}.actions,`),
      `};`,
    ].join('\n');
  }
  function createStore() {
    return [
      `export const store = configureStore({`,
      `  reducer: {`,
      ...stores.map(name => `    [${name}.name]: ${name}.slice.reducer,`),
      `  },`,
      `  middleware: getDefaultMiddleware => {`,
      `    let middlewares = getDefaultMiddleware() as any;`,
      `    if (ENV_DEV) {`,
      `      middlewares = middlewares.concat(logger);`,
      `    }`,
      `    return middlewares;`,
      `  },`,
      `});`,
    ].join('\n');
  }
}
