from preclude import *


class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        n = len(nums)

        def dfs(cur: int, size: int, even: int, odd: int) -> int:
            if cur == n:
                return even - odd
            res = dfs(cur + 1, size, even, odd)
            if size % 2 == 0:
                even += nums[cur]
            else:
                odd += nums[cur]
            return max(res, dfs(cur+1, size+1, even, odd))
        return dfs(0, 0, 0, 0)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
