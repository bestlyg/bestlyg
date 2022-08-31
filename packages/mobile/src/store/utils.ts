import { ENV_DEV, getStorage, setStorage } from '@/utils';
import { names, store, actions } from './index';

class Persist {
  format(name: string) {
    return `store/${name}`;
  }
  load() {
    names.forEach(name => {
      const [meta] = getStorage([this.format(name)]);
      let obj: any;
      if (!meta) return;
      try {
        obj = JSON.parse(meta);
      } catch (error) {
        if (ENV_DEV) {
          console.error('persist storage', error);
        }
        return;
      }
      store.dispatch(actions[name].persist(obj));
    });
  }
  set(name: string) {
    return (state: any) => setStorage({ [this.format(name)]: JSON.stringify(state) });
  }
}
export const persist = new Persist();
