import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '445. 两数相加 II',
    url: 'https://leetcode.cn/problems/sum-of-imbalance-numbers-of-all-subarrays/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的整数数组 nums ，请你返回它所有 子数组 的 不平衡数字 之和。`,
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
            time: 24,
            memory: 68.9,
            desc: '递归',
            code: `class Solution {
public:
    int get_len(ListNode *l) {
        int cnt = 0;
        for (ListNode *p = l; p; p = p->next) cnt++;
        return cnt;
    }
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int len1 = get_len(l1), len2 = get_len(l2);
        if (len2 > len1) {
            swap(len1, len2);
            swap(l1, l2);
        }
        while (len1 > len2) {
            ListNode *head = new ListNode(0, l2);
            l2 = head;
            len2++;
        }
        auto res = dfs(l1, l2);
        if (res.first) {
            ListNode *head = new ListNode(1, l1);
            l1 = head;
        }
        return l1;
    }
    pair<int, ListNode*> dfs(ListNode* l1, ListNode* l2) {
        if (!l1) return make_pair(0, l2);
        if (!l2) return make_pair(0, l1);
        auto res = dfs(l1->next, l2->next);
        l1->next = res.second;
        l1->val += l2->val + res.first;
        int add = 0;
        if (l1->val >= 10) {
            l1->val -= 10;
            add = 1;
        }
        return make_pair(add, l1);
    }
};`,
        },
        {
            script: Script.PY,
            time: 88,
            memory: 15.9,
            desc: '同上',
            code: `def getLen(l: Optional[ListNode]):
    if not l:
        return 0
    cnt = 0
    while l:
        cnt += 1
        l = l.next
    return cnt


def dfs(l1: Optional[ListNode], l2: Optional[ListNode]) -> Tuple[int, ListNode]:
    if not l1:
        return (0, l2)
    if not l2:
        return (0, l1)
    add, next = dfs(l1.next, l2.next)
    l1.next = next
    l1.val += l2.val + add
    add = 0
    if l1.val >= 10:
        l1.val -= 10
        add = 1
    return (add, l1)

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        len1, len2 = getLen(l1), getLen(l2)
        if len2 > len1:
            len1, len2 = len2, len1
            l1, l2 = l2, l1
        while len1 > len2:
            head = ListNode(0, l2)
            l2 = head
            len2 += 1
        add, node = dfs(l1, l2)
        if add:
            head = ListNode(1, l1)
            l1 = head
        return l1`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.9,
            desc: '同上',
            code: `fn get_len(l: &Option<Box<ListNode>>) -> usize {
    match l {
        Some(ref node) => get_len(&node.next) + 1,
        None => 0,
    }
}
fn dfs(
    mut l1: Option<Box<ListNode>>,
    mut l2: Option<Box<ListNode>>,
) -> (i32, Option<Box<ListNode>>) {
    if l1.is_none() {
        (0, l2)
    } else if l2.is_none() {
        (0, l1)
    } else {
        let node1 = l1.as_mut().unwrap();
        let node2 = l2.as_mut().unwrap();
        let (mut add, next) = dfs(node1.next.take(), node2.next.take());
        node1.val += node2.val + add;
        node1.next = next;
        add = 0;
        if node1.val >= 10 {
            node1.val -= 10;
            add = 1;
        }
        (add, l1)
    }
}
impl Solution {
    pub fn add_two_numbers(
        mut l1: Option<Box<ListNode>>,
        mut l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let (mut len1, mut len2) = (get_len(&l1), get_len(&l2));
        if len2 > len1 {
            std::mem::swap(&mut len1, &mut len2);
            std::mem::swap(&mut l1, &mut l2);
        }
        while len1 > len2 {
            let mut head = Box::new(ListNode::new(0));
            head.next = l2.take();
            l2 = Some(head);
            len2 += 1;
        }
        let (add, mut node) = dfs(l1, l2);
        if add != 0 {
            let mut head = Box::new(ListNode::new(1));
            let next = node.take();
            head.next = next;
            node = Some(head);
        }
        node
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
