import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '21. 合并两个有序链表',
    url: 'https://leetcode.cn/problems/unique-paths-iii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 14.5,
            desc: 'dfs',
            code: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode *head = new ListNode(), *p = head;
        while (list1 || list2) {
            if (!list2 || list1 && list1->val <= list2->val) {
                p->next = list1;
                list1 = list1->next;
            } else {
                p->next = list2;
                list2 = list2->next;
            }
            p = p->next;
        }

        return head->next;
    }
};`,
        },
        {
            script: Script.PY,
            time: 52,
            memory: 15.59,
            desc: '同上',
            code: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        head = ListNode()
        p = head
        while list1 or list2:
            if not list2 or list1 and list1.val <= list2.val:
                p.next = list1
                list1 = list1.next
            else:
                p.next = list2
                list2 = list2.next
            p = p.next
        return head.next`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.06,
            desc: '同上',
            code: `impl Solution {
pub fn merge_two_lists(
    mut list1: Option<Box<ListNode>>,
    mut list2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    let mut head = ListNode::new(0);
    let mut p = &mut head;
    let tmp = Box::new(ListNode::new(-1));
    while list1.is_some() || list2.is_some() {
        if list2.is_none()
            || list1.is_some() && list1.as_ref().unwrap().val <= list2.as_ref().unwrap().val
        {
            let mut node = list1.take().unwrap();
            let next = node.next.take();
            p.next = Some(node);
            list1 = next;
        } else {
            let mut node = list2.take().unwrap();
            let next = node.next.take();
            p.next = Some(node);
            list2 = next;
        }
        p = p.next.as_mut().unwrap();
    }
    head.next
}
}`,
        },
    ],
};

export default leetCodeMarkdown;
