from preclude import *


class Solution:
    def frogPosition(self, n: int, edges: List[List[int]], t: int, target: int) -> float:
        nodes = [[] for _ in range(n + 1)]
        for e in edges:
            nodes[e[0]].append(e[1])
            nodes[e[1]].append(e[0])
        used = [False for _ in range(n + 1)]
        used[1] = True

        def dfs(cur: int, t: int) -> float:
            sum = 0
            for next in nodes[cur]:
                if not used[next]:
                    sum += 1
            if cur == target or t == 0:
                return 1 if cur == target and (t == 0 or sum == 0) else 0
            for netx in nodes[cur]:
                if not used[next]:
                    used[next] = True
                    res = dfs(next, t - 1)
                    used[next] = False
                    if res != 0:
                        return res / sum
        return dfs(1, t)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
