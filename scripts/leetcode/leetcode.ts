import { fs, resolve, trimBlank } from '../utils';

export * as utils from '../utils';

export interface Solution {
  script: Script;
  time: number;
  memory: number;
  desc: string;
  code: string;
}
export interface Markdown {
  exist: boolean;
  name: string;
  url: string;
  desc: string;
  difficulty: Difficulty;
  tag: Tag[];
  solutions: Solution[];
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

export const rootPath = resolve('packages/client/packages/力扣题解');
export interface SolutionList {
  name: string;
  solutions: string[];
}
export const reg = {
  index: new RegExp(`# (.*)`),
  tag: new RegExp('标签：(.*)  '),
  dif: new RegExp('难度：(.*)  '),
  solution: new RegExp('## 题解 (.*) - ', 'g'),
};
export function analysisFileName(name: string) {
  name = trimBlank(name);
  const res = {
    dirname: '',
    dirorder: 0,
    fileorder: 0,
    type: Type.NUMBER,
  };
  for (const { prefix, order, type } of typeList) {
    if (name.startsWith(prefix)) {
      res.type = type;
      res.dirname = prefix;
      res.dirorder = order;
      res.fileorder = parseFloat(name.substring(prefix.length));
      break;
    }
  }
  if (!res.dirname) {
    const num = ~~((parseFloat(name) - 1) / 100);
    res.dirname = `${num * 100 + 1}-${100 * num + 100}`;
    res.dirorder = parseFloat(res.dirname);
    res.fileorder = parseFloat(name);
  }
  return res;
}
export function findLastSolutionIdx(file: string) {
  const matchList = file.matchAll(reg.solution);
  let lastIndex = 0;
  for (const match of matchList) lastIndex = parseInt(match[1]);
  return lastIndex;
}
export function travel() {
  const dirList = fs
    .readdirSync(rootPath)
    .filter(v => !v.includes('.'))
    .sort((name1, name2) => {
      const order1 = typeList.find(v => v.prefix === name1)?.order ?? parseFloat(name1);
      const order2 = typeList.find(v => v.prefix === name2)?.order ?? parseFloat(name2);
      return order1 - order2;
    });
  const ans: { filepath: string }[] = [];
  for (const dir of dirList) {
    const dirPath = `${rootPath}/${dir}`;
    const list = fs.readdirSync(dirPath).sort((name1, name2) => {
      let len = 0;
      for (const { prefix } of typeList) {
        if (name1.startsWith(prefix) && name2.startsWith(prefix)) {
          len = prefix.length;
          break;
        }
      }
      return parseFloat(name1.substring(len)) - parseFloat(name2.substring(len));
    });
    for (const file of list) {
      const filepath = `${dirPath}/${file}`;
      ans.push({ filepath });
    }
  }
  return ans;
}
