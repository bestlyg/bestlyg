import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2. 两数相加',
    url: 'https://leetcode.cn/problems/reconstruct-a-2-row-binary-matrix/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 2 行 n 列的二进制数组。你需要利用 upper，lower 和 colsum 来重构这个矩阵，并以二维整数数组的形式返回它。`,
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
            time: 20,
            memory:69.8,
            desc: '遍历',
            code: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *head = new ListNode(), *p = head;
        int add = 0;
        while (l1 || l2) {
            int val = (l1 ? l1->val : 0) + 
                      (l2 ? l2->val : 0) +
                      add;
            if (val >= 10) val -= 10, add = 1;
            else add = 0;
            p->next = new ListNode(val);
            p = p->next;
            if (l1) l1 = l1->next;
            if (l2) l2 = l2->next;
        }
        if (add) p->next = new ListNode(1);
        return head->next;
    }
};`,
        },
        {
            script: Script.PY,
            time: 68,
            memory:16.2,
            desc: '同上',
            code: `class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        head = ListNode()
        p = head
        add = 0
        while l1 or l2:
            val = (l1.val if l1 else 0) + (l2.val if l2 else 0) + add
            if val >= 10:
                val -= 10
                add = 1
            else:
                add = 0
            p.next = ListNode(val)
            p = p.next
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next
        if add:
            p.next = ListNode(1)
        return head.next`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2,
            desc: '同上',
            code: `impl Solution {
    pub fn add_two_numbers(
        mut l1: Option<Box<ListNode>>,
        mut l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut head = Box::new(ListNode::new(0));
        let mut p = &mut head;
        let mut p1 = &mut l1;
        let mut p2 = &mut l2;
        let mut add = 0;
        while p1.is_some() || p2.is_some() {
            let mut val = match p1 {
                Some(ref mut node) => {
                    p1 = &mut node.next;
                    node.val
                }
                None => 0,
            } + match p2 {
                Some(ref mut node) => {
                    p2 = &mut node.next;
                    node.val
                }
                None => 0,
            } + add;
            if val >= 10 {
                val -= 10;
                add = 1;
            } else {
                add = 0;
            }
            p.next = Some(Box::new(ListNode::new(val)));
            p = p.next.as_mut().unwrap();
        }
        if add != 0 {
            p.next = Some(Box::new(ListNode::new(1)));
        }
        head.next
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
