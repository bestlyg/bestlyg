from preclude import *


class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        res = [0 for _ in range(n)]
        nodes = [[] for _ in range(n)]
        for edge in edges:
            nodes[edge[0]].append(edge[1])
            nodes[edge[1]].append(edge[0])
        cache = [(0, 0) for _ in range(n)]

        def find(cur: int, p: int) -> Tuple[int, int]:
            ans = (1, 1)
            if len(nodes[cur]) == 1 and nodes[cur][0] == p:
                cache[cur] = ans
            else:
                for child in nodes[cur]:
                    if child != p:
                        res = find(child, cur)
                        ans[0] += res[0]
                        ans[1] += res[1]
                cache[cur] = ans
            return ans
        find(0, -1)

        def dfs(cur: int, p: int, sum: int):
            res[cur] = sum + cache[cur][1] - cache[cur][0]
            for child in nodes[cur]:
                if child != p:
                    dfs(child, cur, res[cur] - cache[child]
                        [1] + n - cache[child][0])
        dfs(0, -1, 0)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
