var add = function (m) {
  var temp = function (n) {
    return add(m + n);
  };
  temp.toString = function () {
    return m.toString(2);
  };
  return temp;
};
console.log(add(3)(4)(5) + '');
