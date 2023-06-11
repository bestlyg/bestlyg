import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1171. 从链表中删去总和值为零的连续节点',
    url: 'https://leetcode.cn/problems/remove-zero-sum-consecutive-nodes-from-linked-list/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个链表的头节点 head，请你编写代码，反复删去链表中由 总和 值为 0 的连续节点组成的序列，直到不存在这样的序列为止。删除完毕后，请你返回最终结果链表的头节点。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 40,
            memory: 12.1,
            desc: '前缀和存储，每次找最前面可以组合为0的节点，递归删除节点',
            code: `class Solution {
public:
    ListNode *h = new ListNode();
    ListNode* removeZeroSumSublists(ListNode* head) {
        h->next = head;
        vector<int> sums(1, 0);
        auto p = h;
        int start = -1, end = -1;
        bool find = false;
        while (p->next && !find) {
            int sum = p->next->val + sums.back();
            sums.push_back(sum);
            for (int i = 0; i < sums.size() - 1; i++) {
                if (sum - sums[i] == 0) {
                    start = i;
                    end = sums.size() - 1;
                    find = true;
                    break;
                }
            }
            p = p->next;
        }
        if (start == -1) return h->next;
        p = h;
        for (int i = 0; i < start; i++) p = p->next;
        while (end - start > 0) p->next = p->next->next, end--;
        return removeZeroSumSublists(h->next);
    }
};`,
        },
        {
            script: Script.PY3,
            time: 280,
            memory: 16.8,
            desc: '同上',
            code: `class Solution:
    def removeZeroSumSublists(self, head: Optional[ListNode]) -> Optional[ListNode]:
        h = ListNode()
        h.next = head
        sums = [1]
        p = h
        start = end = -1
        find = False
        while p.next and not find:
            sum = p.next.val + sums[-1]
            sums.append(sum)
            for i in range(len(sums) - 1):
                if sum - sums[i] == 0:
                    start = i
                    end = len(sums) - 1
                    find = True
                    break
            p = p.next
        if start == -1:
            return h.next
        p = h
        for i in range(start):
            p = p.next
        while end-start > 0:
            p.next = p.next.next
            end -= 1
        return self.removeZeroSumSublists(h.next)`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 2,
            desc: '同上',
            code: `impl Solution {
    pub fn remove_zero_sum_sublists(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut h = Box::new(ListNode::new(0));
        h.next = head;
        let mut sums = vec![1];
        let mut p = &mut h;
        let (mut start, mut end) = (usize::MAX, usize::MAX);
        let mut find = false;
        while p.next.is_some() && !find {
            let next = p.next.as_mut().unwrap();
            let sum = next.val + sums.last().unwrap();
            sums.push(sum);
            for i in 0..sums.len() - 1 {
                if sum - sums[i] == 0 {
                    start = i;
                    end = sums.len() - 1;
                    find = true;
                    break;
                }
            }
            p = next;
        }
        if start == usize::MAX {
            h.next
        } else {
            p = &mut h;
            for i in 0..start {
                p = p.next.as_mut().unwrap();
            }
            while end - start > 0 {
                let child = p.next.as_mut().unwrap().next.take();
                p.next = child;
                end -= 1;
            }
            Solution::remove_zero_sum_sublists(h.next)
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
