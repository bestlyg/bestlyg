from math import *
from preclude import *


class Node:
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
        return False


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
