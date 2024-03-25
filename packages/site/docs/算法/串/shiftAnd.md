import CodeSource from '!!raw-loader!@bestlyg/code/src/algorithms/sequence/shiftAnd.ts';
import CodeBlock from '@theme/CodeBlock';

# ShiftAnd(ShiftAnd)

- Shift-And 算法的核心思想是利用掩码 D 来记录模式串的前缀匹配情况。
- 常用用作于流数据匹配和，正则模式匹配(同一下标位可能出现多个字符)

1. 对模式串进行处理，对每个存在的字符生成二进制数字
1. 遍历文本串依次进行匹配
1. 标记数字 p，二进制第 i 位为 1 表示遍历当前字符时可匹配模式串的前 i 位
1. 当 p 最高位为 1 时说明已匹配完成模式串



## 核心代码

<CodeBlock language="tsx">{CodeSource}</CodeBlock>