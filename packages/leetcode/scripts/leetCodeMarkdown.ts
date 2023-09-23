import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '146. LRU 缓存',
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
            time: 544,
            memory: 73.81,
            desc: '链表',
            code: `class Node:
        def __init__(self, key=0, val: int = 0, prev=None, next=None):
            self.key = key
            self.val = val
            self.prev = prev
            self.next = next
    
        def append(self, prev):
            next = prev.next
            prev.next, next.prev, self.prev, self.next = self, self, prev, next
    
        def remove(self):
            if self.prev:
                self.prev.next, self.next.prev = self.next, self.prev
    
    
    class LRUCache:
        def __init__(self, capacity: int):
            self.cache = {}
            self.capacity = capacity
            self.size = 0
            self.head = Node()
            self.tail = Node()
            self.head.next = self.tail
            self.tail.prev = self.head
    
        def get(self, key: int) -> int:
            if key not in self.cache:
                return -1
            node = self.cache[key]
            node.remove()
            node.append(self.head)
            return node.val
    
        def put(self, key: int, value: int) -> None:
            if key not in self.cache:
                self.cache[key] = Node(key, value)
                self.size += 1
                if self.size > self.capacity:
                    self.size -= 1
                    del self.cache[self.tail.prev.key]
                    self.tail.prev.remove()
            node = self.cache[key]
            node.val = value
            node.remove()
            node.append(self.head)`,
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
