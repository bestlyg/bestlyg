from preclude import *


class Solution:
    def minTrioDegree(self, n: int, edges: List[List[int]]) -> int:
        nodes = [set() for _ in range(n)]
        for [n0, n1] in edges:
            nodes[n0-1].add(n1-1)
            nodes[n1-1].add(n0-1)
        res = inf
        for i in range(n):
            for j in range(i + 1, n):
                if not j in nodes[i]:
                    continue
                for k in range(j + 1, n):
                    if not k in nodes[i] or not k in nodes[j]:
                        continue
                    res = min(res, len(nodes[i]) +
                              len(nodes[j]) + len(nodes[k]) - 6)
        return res if res != inf else -1


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
