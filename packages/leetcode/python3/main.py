from preclude import *


class Solution:
    def trap(self, height: List[int]) -> int:
        sum = 0
        n = len(height)
        cur = 0
        r = [0] * n
        for i in range(n-1, -1, -1):
            r[i] = cur
            cur = max(cur, height[i])
        cur = 0
        for i in range(n):
            cur = max(cur, height[i])
            sum += max(0, min(cur, r[i])-height[i])
        return sum


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
