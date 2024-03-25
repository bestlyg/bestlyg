import CodeSource1 from '!!raw-loader!@bestlyg/code/src/algorithms/sequence/kmp.ts';
import CodeSource2 from '!!raw-loader!@bestlyg/code/src/algorithms/sequence/kmp2.ts';
import CodeBlock from '@theme/CodeBlock';

# KMP(KMP)

- KMP 是 Knuth–Morris–Pratt 的简称（取名自 3 位发明人的名字），于 1977 年发布。
- KMP 的精妙之处：充分利用了此前比较过的内容，可以很聪明地跳过一些不必要的比较位置，KMP 会预先根据模式串的内容生成一张 next 表（一般是个数组）
- 利用状态机原理，对模式串进行生成状态机数组，遍历文本串，对于每一位文本串更改模式串状态。
- 每次只处理当前字符，不需要全文本串的载入，常用于流数据的匹配。

1. 对模式串进行处理，遍历模式串依次判断以当前位置结尾时，最多 n 位尾部字符串能匹配 n 位头部字符串，生成 next 数组
1. 遍历文本串依次进行匹配
1. 当前字符无法匹配时，进行回溯快速前进


## 核心代码

<CodeBlock language="tsx">{CodeSource1}</CodeBlock>
<CodeBlock language="tsx">{CodeSource2}</CodeBlock>