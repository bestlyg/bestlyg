import CodeSource from '!!raw-loader!@best-lyg/code/src/algorithms/sequence/sunday.ts';
import CodeBlock from '@theme/CodeBlock';

# Sunday(Sunday)

- Sunday 算法由 Daniel M.Sunday 在 1990 年提出。
- 只不过 Sunday 算法是从前往后匹配，在匹配失败时关注的是主串中参加匹配的最末位字符的下一位字符。
- 常用作快速匹配文本。

1. 对模式串进行处理，获取每个字符最后一位出现的下标
1. 遍历文本串依次进行匹配
1. 当前字符无法匹配时，获取 i+len 下标的字符从模式串中进行查找，从而进行快速匹配



## 核心代码

<CodeBlock language="tsx">{CodeSource}</CodeBlock>