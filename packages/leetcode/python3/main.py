from math import *
from preclude import *


class NodeBase:
    def __init__(self, prev, next):
        self.prev = prev
        self.next = next

    def append(self, prev):
        next = prev.next
        prev.next, next.prev, self.prev, self.next = self, self, prev, next

    def remove(self):
        if self.prev:
            self.prev.next, self.next.prev = self.next, self.prev
            self.next, self.prev = None, None

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

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        nextCntNode = self.get_next_cntnode(node.cntNode)
        node.remove()
        self.check_cntnode_empty(node.cntNode)
        node.cnt += 1
        node.cntNode = nextCntNode
        node.append(nextCntNode.head)
        return node.val

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
                node = CntNode(1)
                node.append(self.head)
                self.cntCache[1] = node
        node = self.cache[key]
        node.val = value
        node.cnt += 1
        nextCntNode = self.get_next_cntnode(node.cntNode)
        node.remove()
        if node.cntNode != self.head:
            self.check_cntnode_empty(node.cntNode)
        node.append(nextCntNode.head)
        node.cntNode = nextCntNode


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
