from preclude import *


class Solution:
    def mctFromLeafValues(self, arr: List[int]) -> int:
        @cache
        def dfs(l: int, r: int) -> List[int]:
            if l == r:
                return [arr[l], 0]
            res = [arr[r], inf]
            for i in range(l, r):
                res[0] = max(res[0], arr[i])
                left, right = dfs(l, i), dfs(i+1, r)
                sum = left[0] * right[0] + left[1] + right[1]
                res[1] = max(res[1], sum)
            return res
        return dfs(0, len(arr) - 1)[1]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
