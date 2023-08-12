import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '23. 合并 K 个升序链表',
    url: 'https://leetcode.cn/problems/merge-k-sorted-lists/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。`,
    solutions: [
        {
            date: new Date('2020.04.26').getTime(),
            script: Script.JS,
            time: 384,
            memory: 44.78,
            desc: '归并排序',
            code: `var mergeKLists = function (lists) {
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];
    let resNode;
    for (const node of lists) {
        if (node === null) continue;
        if (resNode === undefined) resNode = node;
        else resNode = add(resNode, node);
    }
    return resNode===undefined?null:resNode;
};
function add(node1, node2) {
    let tempNode1 = node1;
    let tempNode2 = node2;
    let resNode;
    let tempNode3;
    while (tempNode1 !== null || tempNode2 !== null) {
        let minNode;
        if (tempNode1 === null) {
            minNode = tempNode2;
            tempNode2 = tempNode2.next;
        } else if (tempNode2 === null) {
            minNode = tempNode1;
            tempNode1 = tempNode1.next;
        } else if (tempNode1.val < tempNode2.val) {
            minNode = tempNode1;
            tempNode1 = tempNode1.next;
        } else {
            minNode = tempNode2;
            tempNode2 = tempNode2.next;
        }
        if (resNode === undefined) {
            tempNode3 = resNode = minNode;
        } else {
            tempNode3.next = minNode;
            tempNode3 = tempNode3.next;
        }
    }
    return resNode;
}`,
        },
        {
            date: new Date('2021.05.13').getTime(),
            script: Script.TS,
            time: 220,
            memory: 48.3,
            desc: '归并排序',
            code: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  lists = lists.filter(list => list !== null);
  const len = lists.length;
  if (len === 0) return null;
  const merge = (start: number, end: number): ListNode | null => {
    console.log(start, end);
    if (start > end) return null;
    if (start === end) return lists[start];
    const mid = (start + end) >> 1;
    const list1 = merge(start, mid);
    const list2 = merge(mid + 1, end);
    if (list1 === null) return list2;
    if (list2 === null) return list1;
    const first = new ListNode(0);
    let temp = first;
    let p1: ListNode | null = list1;
    let p2: ListNode | null = list2;
    while (p1 && p2) {
      if (p1.val <= p2.val) {
        temp.next = p1;
        temp = temp.next;
        p1 = p1.next;
      } else {
        temp.next = p2;
        temp = temp.next;
        p2 = p2.next;
      }
    }
    if (p1) temp.next = p1;
    if (p2) temp.next = p2;
    return first.next;
  };
  return merge(0, len - 1);
}}`,
        },
        {
            script: Script.CPP,
            time: 16,
            memory: 12.67,
            desc: '堆存储每个头节点',
            code: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        ListNode *head = new ListNode(), *p = head;
        auto cmp = [&](ListNode* n1, ListNode* n2) {
            return n2->val < n1->val;
        };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> q(cmp);
        for (auto &node : lists) {
            if (node) q.push(node);
        }
        while (q.size()) {
            auto node = q.top();
            q.pop();
            p->next = node;
            p = p->next;
            if (node->next) q.push(node->next);
        }
        return head->next;
    }
};`,
        },
        {
            script: Script.PY,
            time: 136,
            memory: 19.82,
            desc: '同上',
            code: `ListNode.__lt__ = lambda a, b: a.val < b.val

    class Solution:
        def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
            head = ListNode()
            p = head
            q = []
            for node in lists:
                if node:
                    print(node)
                    heappush(q, node)
    
            while len(q):
                node = heappop(q)
                p.next = node
                p = p.next
                if node.next:
                    heappush(q, node.next)
            return head.next`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 3.25,
            desc: '同上',
            code: `use std::cmp::{Ord, Ordering, PartialOrd};
impl Ord for ListNode {
    fn cmp(&self, other: &Self) -> Ordering {
        other.val.cmp(&self.val)
    }
}
impl PartialOrd for ListNode {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        other.val.partial_cmp(&self.val)
    }
}

impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        let mut head = Some(Box::new(ListNode::new(0)));
        let mut p = head.as_mut().unwrap();
        let mut q = std::collections::BinaryHeap::new();
        for node in lists {
            if let Some(node) = node {
                q.push(node);
            }
        }
        while let Some(mut node) = q.pop() {
            let next = node.next.take();
            p.next = Some(node);
            p = p.next.as_mut().unwrap();
            if let Some(next) = next {
                q.push(next);
            }
        }
        head.unwrap().next
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
