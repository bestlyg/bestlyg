from preclude import *


class Solution:
    def avoidFlood(self, rains: List[int]) -> List[int]:
        full = dict()
        empty = []
        res = [-1] * len(rains)
        for i, rain in enumerate(rains):
            if rain == 0:
                empty.append(i)
            elif rain not in full:
                full[rain] = i
            else:
                l = bisect_left(empty, full[rain])
                if l == len(empty):
                    return []
                res[empty[l]] = rain
                full[rain] = i
                empty.pop(l)
        for o in empty:
            res[o] = 1
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
