from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Node:
    def __init__(self) -> None:
        self.next = [[] for _ in range(2)]


class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]) -> List[int]:
        ans = [-1] * n
        ans[0] = 0
        cache = [[False] * n for _ in range(2)]
        list = [Node() for _ in range(n)]
        for [v1, v2] in redEdges:
            list[v1].next[0].append(v2)
        for [v1, v2] in blueEdges:
            list[v1].next[1].append(v2)
        q = Queue()
        q.put((0, -1))
        l, size = 0, 1
        while not q.empty():
            (node, color) = q.get()
            size -= 1
            for i in range(2):
                if color == i:
                    continue
                for val in list[node].next[i]:
                    if cache[i][val]:
                        continue
                    cache[i][val] = True
                    if ans[val] == -1:
                        ans[val] = l + 1
                    q.put((val, i))
            if size == 0:
                size = q.qsize()
                l += 1
        return ans


def main():
    o = Solution()
    res = o.shortestAlternatingPaths(
        5,
        [[0, 1], [1, 2], [2, 3], [3, 4]],
        [[1, 2], [2, 3], [3, 1]]

        # 3,
        # [[0, 1], [0, 2]],
        # [[1, 0]]
    )
    print(res)


main()
