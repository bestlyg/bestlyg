import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '143. 重排链表',
    url: 'https://leetcode.cn/problems/parallel-courses-iii/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回完成所有课程所需要的 最少 月份数。`,
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
            time: 40,
            memory: 17.2,
            desc: '找到中点，翻转后半部分，合并',
            code: `class Solution {
public:
    void reorderList(ListNode* head) {
        // mid
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        // reverse
        ListNode *last = slow->next;
        if (!last) return;
        while (last->next) {
            ListNode *tmp = last->next;
            last->next = tmp->next;
            tmp->next = slow->next;
            slow->next = tmp;
        }
        // merge
        ListNode *l1 = head, *l2 = slow->next;
        while (l1 && l2) {
            ListNode *tmp1 = l1->next, *tmp2 = l2->next;
            l1->next = l2;
            l2->next = tmp1;
            l1 = tmp1;
            l2 = tmp2;
        }
        // last node
        slow->next = nullptr;
    }
};`,
        },
        {
            script: Script.PY,
            time: 76,
            memory: 24.5,
            desc: '同上',
            code: `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        last = slow.next
        if not last:
            return
        while last.next:
            tmp = last.next
            last.next = tmp.next
            tmp.next = slow.next
            slow.next = tmp

        l1 = head
        l2 = slow.next
        while l1 and l2:
            tmp1 = l1.next
            tmp2 = l2.next
            l1.next = l2
            l2.next = tmp1
            l1 = tmp1
            l2 = tmp2
        slow.next = None`,
        },
        // {
        //     script: Script.RUST,
        //     time: 64,
        //     memory: 11.9,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
