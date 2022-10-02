import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '777. 在LR字符串中交换相邻字符',
  url: 'https://leetcode.cn/problems/swap-adjacent-in-lr-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.双指针, Tag.字符串],
  desc: `现给定起始字符串start和结束字符串end，请编写代码，当且仅当存在一系列移动操作使得start可以转换成end时， 返回True。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 9.2,
      desc: 'L字符可以左移，R字符可以右移，确保LR在字符串中数量相等，相对位置一样',
      code: `class Solution {
public:
    typedef pair<int, int> node;
    bool canTransform(string start, string end) {
        int n = start.size(), s_l = 0, s_r = 0, e_l = 0, e_r = 0;
        vector<node> s_list, e_list;
        for (int i = 0; i < n; i++) {
            if (start[i] == 'L') s_list.push_back(make_pair(i, 0)), s_l++;
            else if (start[i] == 'R') s_list.push_back(make_pair(i, 1)), s_r++;
            if (end[i] == 'L') e_list.push_back(make_pair(i, 0)), e_l++;
            else if (end[i] == 'R') e_list.push_back(make_pair(i, 1)), e_r++;
        }
        if (s_l != e_l || s_r != e_r) return false;
        n = s_list.size();
        for (int i = 0; i < n; i++) {
            node s_node = s_list[i], e_node = e_list[i];
            if (s_node.second != e_node.second) return false;
            if (s_node.second == 0 && s_node.first < e_node.first) return false;
            if (s_node.second == 1 && s_node.first > e_node.first) return false;
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
