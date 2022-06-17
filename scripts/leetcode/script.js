let a = 1;
function data() {
  console.log(a);
}
const cb = {data}

Promise.resolve().then(() => {
  const {data} = cb;
  data()
}, 100);

a++;