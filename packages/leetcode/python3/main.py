from math import isqrt
from preclude import *


class Solution:
    def minimumIncompatibility(self, nums: List[int], k: int) -> int:
        n = len(nums)
        m = Counter()
        for num in nums:
            m[num] += 1
            if m[num] > k:
                return -1
        if k == n:
            return 0
        nums.sort()

        def comp(cnt: int, total: int, used: int) -> List[List[int]]:
            res = []
            list = []

            def dfs(idx: int, sum: int):
                if total - idx < sum:
                    pass
                elif sum == 0:
                    res.append(list.copy())
                else:
                    if not (used & (1 << idx)):
                        list.append(idx)
                        next_idx = idx + 1
                        while next_idx < total and nums[next_idx] == nums[idx]:
                            next_idx += 1
                        dfs(next_idx, sum - 1)
                        list.pop()
                    dfs(idx + 1, sum)
            dfs(0, cnt)
            return res

        def dfs(cur: int, used: int) -> int:
            if cur == k:
                return 0
            res = inf
            lists = comp(n//k, n, used)
            for list in lists:
                next_used = used
                nmin = inf
                nmax = -inf
                for i in list:
                    nmin = min(nmin, nums[i])
                    nmax = max(nmax, nums[i])
                    next_used |= 1 << i
                next = dfs(cur + 1, next_used)
                res = min(res, next + nmax - nmin)
        return dfs(0, 0)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
