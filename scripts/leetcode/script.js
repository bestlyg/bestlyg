let obj = { a: 1 };
console.log(obj.a);
let newA = 12;
Object.defineProperties(obj, {
  a: {
    get() {
      return newA++;
    },
    set(v) {
      console.log('set', v);
    },
  },
});
console.log(obj.a);
obj.a = 1223;
