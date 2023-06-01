from preclude import *


class Solution:
    def maximumTastiness(self, price: List[int], k: int) -> int:
        price.sort()
        n = len(price)
        l = 0
        r = price[n-1]-price[0]
        while l < r:
            m = (l+r+1)//2
            cnt = 1
            prev = price[0]
            for i in range(1, n):
                if price[i] - prev >= m:
                    cnt += 1
                    prev = price[i]
            if cnt < k:
                r = m-1
            else:
                l = m
        return l


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
