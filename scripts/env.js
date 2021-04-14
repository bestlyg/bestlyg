const { BestPromise } = require('@bestlyg/data-structure');
new BestPromise(resolve => {
  setTimeout(() => {
    resolve(1);
  }, 0);
}).finally(() => {
  console.log('finally');
});
