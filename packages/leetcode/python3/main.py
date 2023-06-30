from math import isqrt
from preclude import *


class Solution:
    def isCircularSentence(self, sentence: str) -> bool:
        l = sentence.split(' ')
        for i in range(len(l)):
            if l[i][-1] != l[(i + 1) % len(l)][0]:
                return False
        return True


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
