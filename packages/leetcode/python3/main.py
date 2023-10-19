from preclude import *


class Solution:
    def tupleSameProduct(self, nums: List[int]) -> int:
        n = len(nums)
        map = Counter()
        for i in range(n):
            for j in range(i + 1, n):
                map[nums[i] * nums[j]] += 1
        return sum(v * (v - 1) * 4 for v in map.values())


# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner()
# param_1 = obj.next(price)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
