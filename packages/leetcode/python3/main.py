from math import *
from preclude import *


class StockSpanner:

    def __init__(self):
        self.idx = 0
        self.arr = []

    def next(self, price: int) -> int:
        while self.arr and self.arr[-1][1] > price:
            self.arr.pop()
        self.idx += 1
        res = self.idx - (self.arr[-1][0] if self.arr else 0)
        self.arr.append((self.idx, price))
        return res


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
