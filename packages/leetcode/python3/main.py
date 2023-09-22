from math import *
from preclude import *


class Solution:
    def distMoney(self, money: int, children: int) -> int:
        if money < children:
            return -1
        cnt = money // 8
        surplus_money = money % 8
        surplus_children = children - cnt
        if cnt == children:
            if surplus_money == 0:
                return children
            return children - 1
        if cnt > children:
            return children - 1
        if surplus_money == surplus_children:
            return cnt
        if surplus_money > surplus_children:
            if surplus_children == 1 and surplus_money == 4:
                return cnt - 1
            return cnt
        return cnt - ceil((surplus_children - surplus_money) / 7)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
