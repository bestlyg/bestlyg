import { resolve, trimBlank } from './fn';

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
  SlidingWindow = 'SlidingWindow',
  OrderedMap = 'OrderedMap',
  二分查找 = '二分查找',
  分治算法 = '分治算法',
  动态规划 = '动态规划',
  回溯算法 = '回溯算法',
  栈 = '栈',
  堆 = '堆',
  贪心算法 = '贪心算法',
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
}
export enum Script {
  JS = 'javascript',
  TS = 'typescript',
  PY = 'python',
  CS = 'c#',
  JAVA = 'java',
}

export const srcPath = resolve('packages/leetcode/src');
export interface SolutionList {
  name: string;
  solutions: string[];
}
export const HADER_LCP = 'LCP';
export const HADER_OFFER = '剑指Offer';
export const HADER_FACE = '面试题';
export const indexReg = new RegExp(`# (.*)`);
export const tagReg = new RegExp('标签：(.*)  ');
export const difReg = new RegExp('难度：(.*)  ');
export const solutionReg = new RegExp('## 题解 (.*) - ', 'g');
export const getNumDirName = (file: string) => {
  const num = ~~((parseFloat(file) - 1) / 100);
  const dirName = `${num * 100 + 1}-${100 * num + 100}`;
  return dirName;
};
export const getDirName = (fileName: string) => {
  const name = trimBlank(fileName);
  let dirName = '';
  if (name.startsWith(HADER_FACE)) {
    dirName = HADER_FACE;
  } else if (name.startsWith(HADER_LCP)) {
    dirName = HADER_LCP;
  } else if (name.startsWith(HADER_OFFER)) {
    dirName = HADER_OFFER;
  } else {
    dirName = getNumDirName(name);
  }
  return dirName;
};
export const getFileOrder = (file: string) => {
  if (file.startsWith(HADER_LCP)) {
    return parseFloat(file.substr(HADER_LCP.length));
  } else if (file.startsWith(HADER_FACE)) {
    return parseFloat(file.substr(HADER_FACE.length));
  } else if (file.startsWith(HADER_OFFER)) {
    return parseFloat(file.substr(HADER_OFFER.length));
  } else {
    return parseFloat(file);
  }
};
export const getDirOrder = (dir: string) => {
  if (dir.startsWith(HADER_LCP)) {
    return 300000;
  } else if (dir.startsWith(HADER_FACE)) {
    return 100000;
  } else if (dir.startsWith(HADER_OFFER)) {
    return 200000;
  } else {
    return parseFloat(dir);
  }
};
