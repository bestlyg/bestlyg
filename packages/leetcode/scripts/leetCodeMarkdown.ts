import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1670. 设计前中后队列',
    url: 'https://leetcode.cn/problems/count-unique-characters-of-all-substrings-of-a-given-string/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵二叉树，每个节点的值为 1 到 9 。我们称二叉树中的一条路径是 「伪回文」的，当它满足：路径经过的所有节点值的排列中，存在一个回文序列。请你返回从根到叶子节点的所有路径中 伪回文 路径的数目。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 68,
            memory: 16.81,
            desc: '两个双端队列1670. 设计前中后队列',
            code: `class FrontMiddleBackQueue:
    def __init__(self):
        self.len = 0
        self.q1 = deque()
        self.q2 = deque()
    def pushFront(self, val: int) -> None:
        self.q1.appendleft(val)
        self.after(1)
    def pushMiddle(self, val: int) -> None:
        self.q2.appendleft(val)
        self.after(1)
    def pushBack(self, val: int) -> None:
        self.q2.append(val)
        self.after(1)
    def after(self, offset: int) -> None:
        self.len += offset
        if len(self.q1) + 2 == len(self.q2): self.q1.append(self.q2.popleft())
        elif len(self.q1) == len(self.q2) + 1: self.q2.appendleft(self.q1.pop()) 
    def popFront(self) -> int:
        if self.len == 0: return -1
        val = self.q2.pop() if self.len == 1 else self.q1.popleft()
        self.after(-1)
        return val
    def popMiddle(self) -> int:
        if self.len == 0: return -1
        val = self.q1.pop() if self.len % 2 == 0 else self.q2.popleft()
        self.after(-1)
        return val
    def popBack(self) -> int:
        if self.len == 0: return -1
        val = self.q2.pop()
        self.after(-1)
        return val`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
