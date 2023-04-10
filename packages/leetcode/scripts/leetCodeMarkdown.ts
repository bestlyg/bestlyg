import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1019. 链表中的下一个更大节点',
  url: 'https://leetcode.cn/problems/next-greater-node-in-linked-list/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回一个整数数组 answer ，其中 answer[i] 是第 i 个节点( 从1开始 )的下一个更大的节点的值。如果第 i 个节点没有下一个更大的节点，设置 answer[i] = 0 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 72,
      memory: 43.8,
      desc: '单调栈',
      code: `class Solution {
public:
    vector<int> nextLargerNodes(ListNode* head) {
        int idx = 0;
        ListNode *tmp = head;
        vector<int> vlist, res;
        stack<int> s;
        while (tmp) {
            vlist.push_back(tmp->val);
            res.push_back(0);
            while (s.size() && vlist[s.top()] < tmp->val) {
                int top = s.top();
                s.pop();
                res[top] = tmp->val;
            }
            s.push(idx);
            idx++;
            tmp = tmp->next;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 220,
      memory: 19.8,
      desc: '同上',
      code: `class Solution:
    def nextLargerNodes(self, head: Optional[ListNode]) -> List[int]:
        idx = 0
        tmp = head
        vlist, res, s = [], [], []
        while tmp:
            vlist.append(tmp.val)
            res.append(0)
            while len(s) and vlist[s[-1]] < tmp.val:
                res[s.pop()] = tmp.val
            s.append(idx)
            idx += 1
            tmp = tmp.next
        return res`,
    },
    {
      script: Script.PY3,
      time: 24,
      memory: 2.9,
      desc: '同上',
      code: `impl Solution {
    pub fn next_larger_nodes(head: Option<Box<ListNode>>) -> Vec<i32> {
        let mut tmp = &head;
        let mut idx = 0;
        let mut vlist = vec![];
        let mut res = vec![];
        let mut s = vec![];
        while let Some(ref node) = tmp {
            vlist.push(node.val);
            res.push(0);
            while !s.is_empty() && vlist[*s.last().unwrap()] < node.val {
                res[s.pop().unwrap()] = node.val;
            }
            s.push(idx);
            idx += 1;
            tmp = &node.next;
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
