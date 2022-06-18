import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '剑指 Offer II 029. 排序的循环链表',
  url: 'https://leetcode.cn/problems/4ueAj6/',
  difficulty: Difficulty.中等,
  tag: [Tag.链表],
  desc: `给定循环单调非递减列表中的一个点，写一个函数向这个列表中插入一个新元素 insertVal ，使这个列表仍然是循环升序的。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory:7.9,
      desc: '遍历，考虑小于最小值和大于最大值',
      code: `class Solution {
   public:
    Node* insert(Node* head, int insertVal) {
        if (!head) {
            Node* ans = new Node(insertVal);
            ans->next = ans;
            return ans;
        }
        Node *p = head, *node = new Node(insertVal);
        if (p->next != head) {
            int nmin = INT_MAX, nmax = INT_MIN;
            do {
                nmin = min(nmin, p->val);
                nmax = max(nmax, p->val);
                p = p->next;
            } while (p != head);
            if (nmin >= insertVal || nmax <= insertVal) {
                while (p->val <= p->next->val && p->next != head) p = p->next;
            } else {
                while (!(p->val <= insertVal && p->next->val >= insertVal))
                    p = p->next;
            }
        }
        node->next = p->next;
        p->next = node;
        return head;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
