# 暴力匹配(BruteForce)

遍历文本串每一个字符，依次匹配模式串

## 核心代码

```ts
export function bruteForce(text: string, pattern: string): number {
  const len = pattern.length;
  for (let i = 0; text[i]; i++) {
    const substr = text.substr(i, len);
    if (substr === pattern) return i;
  }
  return -1;
}
```
