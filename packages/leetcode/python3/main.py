from preclude import *


class Solution:
    def flipgame(self, fronts: List[int], backs: List[int]) -> int:
        n = len(fronts)
        res = 3000
        s = set()
        for i in range(n):
            if fronts[i] == backs[i]:
                s.add(fronts[i])
        for i in range(n):
            if not fronts[i] in s:
                res = min(res, fronts[i])
            if not backs[i] in s:
                res = min(res, backs[i])
        return res % 3000


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
