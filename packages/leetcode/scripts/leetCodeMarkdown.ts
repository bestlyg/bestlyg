import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '460. LFU 缓存',
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
            time: 720,
            memory: 77.2,
            desc: '链表',
            code: `class NodeBase:
    def __init__(self, prev, next):
        self.prev = prev
        self.next = next

    def append(self, prev):
        next = prev.next
        prev.next, next.prev, self.prev, self.next = self, self, prev, next
        return self

    def remove(self):
        if self.prev:
            self.prev.next, self.next.prev, self.next, self.prev = self.next, self.prev, None, None

class ListBase:
    def __init__(self, cstr):
        self.cstr = cstr
        self.head = cstr()
        self.tail = cstr()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def is_empty(self):
        return self.head.next == self.tail


class Node(NodeBase):
    def __init__(self, key=0, val=0, cnt=0, cntNode=None, prev=None, next=None):
        self.key = key
        self.val = val
        self.cnt = cnt
        self.cntNode = cntNode
        NodeBase.__init__(self, prev, next)


class CntNode(NodeBase, ListBase):
    def __init__(self, cnt = 0, prev=None, next=None):
        self.cnt = cnt
        ListBase.__init__(self, Node)
        NodeBase.__init__(self, prev, next)

class LFUCache(ListBase):

    def __init__(self, capacity: int):
        self.cntCache = {}
        self.cache = {}
        self.capacity = capacity
        self.size = 0
        ListBase.__init__(self, CntNode)

    def get_next_cntnode(self, node):
        if node.next.cnt == node.cnt + 1:
            return node.next
        next = CntNode(node.cnt + 1)
        next.append(node)
        self.cntCache[next.cnt] = next
        return next

    def check_cntnode_empty(self, node):
        if node.is_empty():
            node.remove()
            del self.cntCache[node.cnt]
    
    def upgrade_node(self, key: int, update):
        node = self.cache[key]
        update(node)
        node.cnt += 1
        nextCntNode = self.get_next_cntnode(node.cntNode)
        node.remove()
        if node.cntNode != self.head: self.check_cntnode_empty(node.cntNode)
        node.append(nextCntNode.head)
        node.cntNode = nextCntNode

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.upgrade_node(key, lambda node: node)
        return self.cache[key].val

    def put(self, key: int, value: int) -> None:
        if key not in self.cache:
            self.cache[key] = Node(key, value, 0, self.head)
            self.size += 1
            if self.size > self.capacity:
                self.size -= 1
                firstCntNode = self.head.next
                removeNode = firstCntNode.tail.prev
                removeNode.remove()
                del self.cache[removeNode.key]
                self.check_cntnode_empty(firstCntNode)
            if self.head.next.cnt != 1:
                self.cntCache[1] = CntNode(1).append(self.head)
        def update(node): node.val = value
        self.upgrade_node(key, update)`,
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
