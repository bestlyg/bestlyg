const pick = 1702766719;
var guess = function (num) {
  if (pick > num) return 1;
  else if (pick < num) return -1;
  else return 0;
};
var guessNumber = function (n) {
  const find = (start = 1, end = n) => {
    if (start === end) return start;
    const mid = ~~((end + start) / 2);
    const res = guess(mid);
    if (res === 1) return find(mid + 1, end);
    else if (res === -1) return find(start, mid - 1);
    else return mid;
  };
  return find();
};
console.log(guessNumber(2126753390, pick));
