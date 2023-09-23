import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1993. 树上的操作',
    url: 'https://leetcode.cn/problems/operations-on-tree',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵 n 个节点的树，编号从 0 到 n - 1 ，以父节点数组 parent 的形式给出，其中 parent[i] 是第 i 个节点的父节点。树的根节点为 0 号节点，所以 parent[0] = -1 ，因为它没有父节点。你想要设计一个数据结构实现树里面对节点的加锁，解锁和升级操作。`,
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
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 6.05,
        //     desc: '贪心计算',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 52,
            memory: 15.61,
            desc: '模拟',
            code: `class Node:
    def __init__(self, val: int):
        self.val = val
        self.parent = None
        self.children = []
        self.lock_state = 0

    def lock(self, user: int) -> bool:
        if self.lock_state:
            return False
        self.lock_state = user
        return True

    def unlock(self, user: int) -> bool:
        if self.lock_state != user:
            return False
        self.lock_state = 0
        return True

    def unlock_children(self) -> bool:
        for node in self.children:
            node.lock_state = 0
            node.unlock_children()

    def is_lock(self) -> bool:
        return self.lock_state != 0

    def is_parent_unlock(self) -> bool:
        return not self.parent or not self.parent.is_lock() and self.parent.is_parent_unlock()

    def exist_children_lock(self) -> bool:
        return any(child.is_lock() or child.exist_children_lock() for child in self.children)


class LockingTree:
    def __init__(self, parent: List[int]):
        self.nodes = [Node(i) for i in range(len(parent))]
        self.root = self.nodes[0]
        for i in range(1, len(parent)):
            self.nodes[i].parent = self.nodes[parent[i]]
            self.nodes[parent[i]].children.append(self.nodes[i])

    def lock(self, num: int, user: int) -> bool:
        return self.nodes[num].lock(user)

    def unlock(self, num: int, user: int) -> bool:
        return self.nodes[num].unlock(user)

    def upgrade(self, num: int, user: int) -> bool:
        node = self.nodes[num]
        if not node.is_lock() and node.is_parent_unlock() and node.exist_children_lock():
            node.lock(user)
            node.unlock_children()
            return True
        return False`,
        },
//         {
//             script: Script.RUST,
//             time: 0,
//             memory: 2.58,
//             desc: '同上',
//             code: `
// `,
//         },
    ],
};

export default leetCodeMarkdown;
