import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1791. 找出星型图的中心节点',
  url: 'https://leetcode-cn.com/problems/find-center-of-star-graph/',
  difficulty: Difficulty.简单,
  tag: [Tag.图],
  desc: `给你一个二维整数数组 edges ，其中 edges[i] = [ui, vi] 表示在节点 ui 和 vi 之间存在一条边。请你找出并返回 edges 所表示星型图的中心节点。`,
  solutions: [
    {
      script: Script.CPP,
      time: 144,
      memory: 65.7,
      desc: '直接判断前两个边中，存在相同的点',
      code: `class Solution {
   public:
    int findCenter(vector<vector<int>>& edges) {
        return edges[0][0] == edges[1][0] || edges[0][0] == edges[1][1]
                   ? edges[0][0]
                   : edges[0][1];
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
