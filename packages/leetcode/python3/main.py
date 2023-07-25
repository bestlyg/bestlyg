from preclude import *


class Solution:
    def halveArray(self, nums: List[int]) -> int:
        res = 0
        sum = 0.0
        q: List[float] = []
        for num in nums:
            sum += float(num)
            heappush(q, float(num))
        cur = sum
        while cur > sum / 2:
            top = heappop(q) / 2
            heappush(q, top)
            cur -= top
            res += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
