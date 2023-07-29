import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '141. 环形链表',
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
            time: 8,
            memory: 8,
            desc: '快慢指针',
            code: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head) return false;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next && fast->next != slow) {
            fast = fast->next->next;
            slow = slow->next;
        }
        return fast && fast->next == slow;
    }
};`,
        },
        {
            script: Script.PY,
            time: 64,
            memory: 20.2,
            desc: '同上',
            code: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head:
            return False
        slow = fast = head
        while fast and fast.next and fast.next != slow:
            fast = fast.next.next
            slow = slow.next
        return fast and fast.next == slow`,
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
