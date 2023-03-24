from sortedcontainers import SortedSet
from functools import cache
from heapq import *
from collections import defaultdict
from itertools import accumulate
from string import ascii_lowercase
from typing import List, Optional, Tuple
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict, SortedSet
import heapq
import math

# global
# nonlocal


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]


class Node:
    def __init__(self, row: int, col: int, time: int):
        self.row = row
        self.col = col
        self.time = time

    def __lt__(self, o: 'Node') -> bool:
        return self.time < o.time


class TrieNode:
    def __init__(self) -> None:
        self.end = False
        self.fail = None
        self.children: List[TrieNode] = [None] * 26


class StreamChecker:

    def __init__(self, words: List[str]):
        self.root = self.current = TrieNode()
        for word in words:
            node = self.root
            for c in word:
                idx = ord(c) - ord('a')
                if not node.children[idx]:
                    node.children[idx] = TrieNode()
                node = node.children[idx]
            node.end = True
        q = Queue()
        self.root.fail = self.root
        for i in range(26):
            if self.root.children[i]:
                self.root.children[i].fail = self.root
                q.put(self.root.children[i])
            else:
                self.root.children[i] = self.root
        while q.qsize():
            node: TrieNode = q.get()
            node.end = node.end or node.fail.end
            for i in range(26):
                if node.children[i]:
                    node.children[i].fail = node.fail.children[i]
                    q.put(node.children[i])
                else:
                    node.children[i] = node.fail.children[i]

    def query(self, letter: str) -> bool:
        self.current = self.current.children[ord(letter) - ord('a')]
        return self.current.end


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
