export interface Solution {
  script: Script;
  date?: number;
  time: number;
  memory: number;
  desc: string;
  code: string;
}
export interface Markdown {
  exist?: boolean;
  name: string;
  url: string;
  desc: string;
  difficulty: Difficulty;
  tag: Tag[];
  solutions: Solution[];
}
export interface ReadmeItem { dir: string; list: string[] }
export interface Readme {
  markdownCount: number;
  solutionCount: number;
  index:ReadmeItem[];
  tag:ReadmeItem[];
  difficulty: [
    { dir: Difficulty.简单; list: string[] },
    { dir: Difficulty.中等; list: string[] },
    { dir: Difficulty.困难; list: string[] }
  ];
}
export enum Difficulty {
  简单 = '简单',
  中等 = '中等',
  困难 = '困难',
}
export enum Tag {
  数组 = '数组',
  哈希表 = '哈希表',
  链表 = '链表',
  数学 = '数学',
  双指针 = '双指针',
  字符串 = '字符串',
  滑动窗口 = '滑动窗口',
  OrderedMap = 'OrderedMap',
  二分查找 = '二分查找',
  分治算法 = '分治算法',
  动态规划 = '动态规划',
  回溯算法 = '回溯算法',
  栈 = '栈',
  堆 = '堆',
  贪心 = '贪心',
  排序 = '排序',
  位运算 = '位运算',
  树 = '树',
  深度优先搜索 = '深度优先搜索',
  广度优先搜索 = '广度优先搜索',
  并查集 = '并查集',
  图 = '图',
  设计 = '设计',
  拓扑排序 = '拓扑排序',
  脑经急转弯 = '脑经急转弯',
  极小化极大 = '极小化极大',
  树状数组 = '树状数组',
  线段树 = '线段树',
  记忆化 = '记忆化',
  递归 = '递归',
  队列 = '队列',
  几何 = '几何',
  字典树 = '字典树',
  随机 = '随机',
  拒绝采样 = '拒绝采样',
  矩阵 = '矩阵',
  二叉树 = '二叉树',
  桶排序 = '桶排序',
  计数 = '计数',
  堆_优先队列 = '堆(优先队列)',
  有序集合 = '有序集合',
  前缀和 = '前缀和',
  计数排序 = '计数排序',
  分治 = '分治',
  扫描线 = '扫描线',
  数据流 = '数据流',
  单调栈 = '单调栈',
  单调队列 = '单调队列',
  哈希函数 = '哈希函数',
  滚动哈希 = '滚动哈希',
  双向链表 = '双向链表',
  回溯 = '回溯',
  状态压缩 = '状态压缩',
  二叉搜索树 = '二叉搜索树',
  记忆化搜索 = '记忆化搜索',
  博弈 = '博弈',
  随机化 = '随机化',
  最短路 = '最短路',
  模拟 = '模拟',
  水塘抽样 = '水塘抽样',
  字符串匹配 = '字符串匹配',
  枚举 = '枚举',
  脑筋急转弯 = '脑筋急转弯',
  组合数学 = '组合数学',
  后缀数组 = '后缀数组',
  数论 = '数论',
  快速选择 = '快速选择',
  概率与统计 = '概率与统计',
  有序合集 = '有序合集',
  欧拉回路 = '欧拉回路',
}
export enum Script {
  JS = 'javascript',
  TS = 'typescript',
  PY = 'python',
  CS = 'c#',
  C = 'c',
  CPP = 'cpp',
  JAVA = 'java',
  GO = 'go',
  RUST = 'rust',
}
export enum Type {
  NUMBER,
  FACE,
  LCP,
  OFFER,
  OFFER2,
}
export const typeList: { type: Type; prefix: string; order: number }[] = [
  { type: Type.FACE, prefix: '面试题', order: 100000 },
  { type: Type.LCP, prefix: 'LCP', order: 200000 },
  { type: Type.OFFER2, prefix: '剑指OfferII', order: 400000 },
  { type: Type.OFFER, prefix: '剑指Offer', order: 300000 },
];
