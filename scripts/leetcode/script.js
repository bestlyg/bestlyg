let store;
class Store {
  callback = {};
  submit() {
    this.validate(() => {
      const {onSubmit} = this.callback;
      onSubmit()
    });
  }
  validate(fn) {
    Promise.resolve().then(() => {
      fn();
    });
  }
}

store = new Store();
store.callback.onSubmit = () => {
  console.log('submit', 1);
  store.callback.onSubmit = () => {
    console.log('store', 2);
  };
};
store.submit();
store.submit();
