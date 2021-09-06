import { makeAutoObservable, autorun, when, reaction } from 'mobx';

class Global {
  location = [0, 0];
  count = 1;
  get doubleCount() {
    return this.count * 2;
  }
  constructor() {
    makeAutoObservable(this);
  }
  add(val = 10) {
    this.count += val;
  }
  minus(val = 10) {
    this.count -= val;
  }
  *fetch() {
    setTimeout(() => {
      this.add(120);
    }, 1000);
  }
}
export const global = new Global();
autorun(() => {
  console.log('count changed', global.count);
});
when(
  () => global.count > 300,
  () => {
    console.log('MAX');
    global.count = 0;
  }
);
reaction(
  () => global.count,
  () => {
    console.log(global.count, 'reaction');
  }
);
