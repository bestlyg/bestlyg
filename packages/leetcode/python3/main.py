from math import floor, sqrt
from preclude import *


class Solution:
    def collectTheCoins(self, coins: List[int], edges: List[List[int]]) -> int:
        n = len(edges) + 1
        nodes: List[List[int]] = [[] for _ in range(n)]
        for [n1, n2] in edges:
            nodes[n1].append(n2)
            nodes[n2].append(n1)
        egde_sum = n - 1
        q: deque[int] = deque()
        for i in range(n):
            if len(nodes[i]) == 1 and coins[i] == 0:
                q.append(i)
        while q:
            cur = q.pop()
            for idx in nodes[cur]:
                egde_sum -= 1
                nodes[idx].remove(cur)
                if len(nodes[idx]) == 1 and coins[idx] == 0:
                    q.append(i)
        print(egde_sum)
        return 0


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
