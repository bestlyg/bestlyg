const { fs, resolve, _ } = require('./utils');

main();
function main() {
  const stores = fs
    .readdirSync(resolve('src/store/namespaces'))
    .filter(v => v !== 'index.ts')
    .map(v => v.split('.')[0]);
  const data = stores.map(store => createData(store));
  fs.writeFileSync(resolve('src/store/namespaces/index.ts'), createTemplate(data));
  console.log('store create success');
}
function createData(store) {
  const upperStoreName = _.upperFirst(store);
  const namespace = `${store}Namespace`;
  const importStr = `import { ${namespace}, ${upperStoreName}State, ${upperStoreName}Key, ${store}Action } from './${store}';`;
  const actionStr = `[${namespace}]: ${store}Action,`;
  const rootKeyStr = `[${namespace}]: ${upperStoreName}Key,`;
  const iRootKeyStr = `[${namespace}]: typeof ${upperStoreName}Key;`;
  const rootStateStr = `[${namespace}]: ${upperStoreName}State;`;
  return {
    imp: importStr,
    action: actionStr,
    rootKey: rootKeyStr,
    iRootKey: iRootKeyStr,
    rootState: rootStateStr,
  };
}
function createTemplate(data) {
  return `
import { combineReducers } from 'redux';
${data.map(v => v.imp).join('\n')}

export interface RootKey {
    ${data.map(v => v.iRootKey).join('\n')}
}
export interface RootState {
    ${data.map(v => v.rootState).join('\n')}
}
export type RootDispatch = (
      fn:
        | ((dispatch: RootDispatch, getState: () => RootState) => void)
    | { type: string | number; payload?: unknown }
) => void;
export const rootReducer = combineReducers({
    ${data.map(v => v.action).join('\n')}
});
export const rootKey: RootKey = {
    ${data.map(v => v.rootKey).join('\n')}
};
`;
}
