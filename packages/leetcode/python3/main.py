from preclude import *


class Solution:
    def addStrings(self, s1: str, s2: str) -> str:
        if len(s1) < len(s2):
            s1, s2 = s2, s1
        res = ""
        num1, num2 = list(s1), list(s2)
        num1.reverse()
        num2.reverse()
        i = add = 0
        while i < len(num1) or i < len(num2):
            num = ord(num1[i]) - ord('0') + add
            if i < len(num2):
                num += ord(num2[i]) - ord('0')
            if num >= 10:
                num -= 10
                add = 1
            else:
                add = 0
            res = str(num) + res
            i += 1
        if add:
            res = "1" + res
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
