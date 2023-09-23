from math import *
from preclude import *


class Node:
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
        node.append(self.head)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
