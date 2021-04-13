function isPowerOfTwo(n: number): boolean {
  let i = 1;
  while (i < n) {
    console.log(i);
    i <<= 1;
    if (i < 0) i = -i;
  }
  return i === n;
}
console.log(isPowerOfTwo(1073741825));
