from preclude import *


class Solution:
    def canChange(self, start: str, target: str) -> bool:
        n = len(start)
        i1 = i2 = 0
        while i1 < n and start[i1] == '_':
            i1 += 1
        while i2 < n and start[i2] == '_':
            i2 += 1
        while i1 < n and i2 < n:
            if start[i1] != target[i2]:
                return False
            if start[i1] == 'L' or i1 < i2:
                return False
            if start[i1] == 'R' or i1 > i2:
                return False
            i1 += 1
            i2 += 1
            while i1 < n and start[i1] == '_':
                i1 += 1
            while i2 < n and start[i2] == '_':
                i2 += 1
        return i1 == n and i2 == n


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
