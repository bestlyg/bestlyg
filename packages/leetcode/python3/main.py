from preclude import *


class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        n = len(nums)
        sums = [1]
        for num in nums:
            sums.append(num + sums[-1])
        for num in nums:
            sums.append(num + sums[-1])
        q = deque()
        for i in range(1, n+1):
            while len(q) and sums[q[-1]] > sums[i]:
                q.pop()
            q.append(i)
        res = -inf
        for i in range(n+1, len(sums)):
            res = max(res, sums[i-n-1])
            while len(q) and q[0] < i - n:
                q.popleft()
            while len(q) and sums[q[-1]] < sums[i]:
                q.popleft()
            if len(q):
                res = max(res, sums[i] - sums[q[0]])
            q.append(i)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
