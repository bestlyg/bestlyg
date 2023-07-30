import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '142. 环形链表 II',
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
        // {
        //     script: Script.CPP,
        //     time: 8,
        //     memory: 8,
        //     desc: '快慢指针',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 52,
            memory: 20.1,
            desc: '同上',
            code: `class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next and fast.next != slow:
            slow = slow.next
            fast = fast.next.next
        if not fast or not fast.next:
            return None
        slow = head
        fast = fast.next.next
        while fast != slow:
            fast = fast.next
            slow = slow.next
        return slow`,
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
