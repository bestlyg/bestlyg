from preclude import *


class Solution:
    def minimumTime(self, n: int, relations: List[List[int]], time: List[int]) -> int:
        list = [[] for _ in range(n)]
        for item in relations:
            list[item[1]-1].append(item[0]-1)

        @cache
        def dfs(cur: int) -> int:
            return max(dfs(i) for i in list[cur]) + time[cur]
        return max(dfs(i) for i in range(n))


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
