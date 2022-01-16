import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '382. 链表随机节点',
  url: 'https://leetcode-cn.com/problems/calculate-money-in-leetcode-bank/',
  difficulty: Difficulty.简单,
  tag: [Tag.数学],
  desc: `给你 n ，请你返回在第 n 天结束的时候他在力扣银行总共存了多少块钱。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 16.3,
      desc: '随机数',
      code: `class Solution {
   public:
    vector<int> arr;
    Solution(ListNode* head) {
        srand(time(0));
        ListNode* p = head;
        while (p) {
            arr.push_back(p->val);
            p = p->next;
        }
    }

    int getRandom() { return arr[rand() % arr.size()]; }
};`,
    },
    {
      script: Script.CPP,
      time: 24,
      memory: 16.2,
      desc: '水塘抽样',
      code: `class Solution {
   public:
    ListNode *node;
    Solution(ListNode *head) {
        srand(time(0));
        node = head;
    }

    int getRandom() {
        int ans, i = 1;
        for (ListNode *p = node; p; p = p->next, i++) {
            if (rand() % i == 0) ans = p->val;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
