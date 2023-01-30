import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1669. 合并两个链表',
  url: 'https://leetcode.cn/problems/merge-in-between-linked-lists/',
  difficulty: Difficulty.中等,
  tag: [Tag.链表],
  desc: `给你两个链表 list1 和 list2 ，它们包含的元素分别为 n 个和 m 个。请你将 list1 中下标从 a 到 b 的全部节点都删除，并将list2 接在被删除节点的位置。`,
  solutions: [
    {
      script: Script.CPP,
      time: 260,
      memory: 92.2,
      desc: '双指针',
      code: `class Solution {
public:
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        ListNode *p1 = list1, *p2 = list2, *tmp;
        for (int i = 0; i < a - 1; i++) p1 = p1->next;
        tmp = p1->next;
        p1->next = list2;
        p1 = tmp;
        while (p2->next) p2 = p2->next;
        for (int i = 0; i < b - a; i++) p1 = p1->next;
        p2->next = p1->next;
        return list1;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 372,
      memory: 21.8,
      desc: '同上',
      code: `class Solution:
    def mergeInBetween(self, list1: ListNode, a: int, b: int, list2: ListNode) -> ListNode:
        p1, p2 = list1, list2
        for _ in range(a - 1):
            p1 = p1.next
        tmp = p1.next
        p1.next = list2
        p1 = tmp
        while p2.next:
            p2 = p2.next
        for _ in range(b - a):
            p1 = p1.next
        p2.next = p1.next
        return list1`,
    },
    {
      script: Script.RUST,
      time: 40,
      memory: 3.5,
      desc: '同上',
      code: `impl Solution {
    pub fn put_marbles(weights: Vec<i32>, k: i32) -> i64 {
        let mut list = Vec::new();
        for i in 1..weights.len() {
            list.push(weights[i - 1] + weights[i]);
        }
        list.sort();
        let mut ans = 0;
        for i in 0..k - 1 {
            let i = i as usize;
            ans += (list[list.len() - i - 1] - list[i]) as i64;
        }
        ans
    }
}`,
    },
    {
      script: Script.RUST,
      time: 52,
      memory: 3.6,
      desc: '同上',
      code: `impl Solution {
    pub fn merge_in_between(
        list1: Option<Box<ListNode>>,
        a: i32,
        b: i32,
        list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut list = Vec::<i32>::new();
        let mut p1 = &list1;
        let mut p2 = &list2;
        for _ in 0..a {
            list.push(p1.as_ref().unwrap().val);
            p1 = &p1.as_ref().unwrap().next;
        }
        while let Some(ref node) = p2 {
            list.push(node.val);
            p2 = &node.next;
        }
        for _ in a..=b {
            p1 = &p1.as_ref().unwrap().next;
        }
        while let Some(ref node) = p1 {
            list.push(node.val);
            p1 = &node.next;
        }
        let mut ans = Box::new(ListNode::new(0));
        let mut p = &mut ans;
        for num in list {
            let mut node = p.as_mut();
            node.next = Some(Box::new(ListNode::new(num)));
            p = node.next.as_mut().unwrap();
        }
        ans.next
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
