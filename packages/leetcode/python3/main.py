from preclude import *


class Node:
    def __init__(self, k: int, v: int):
        self.k = k
        self.v = v

    def __lt__(self, o: 'Node') -> bool:
        return self.v < o.v


class Solution:
    def maxEqualRowsAfterFlips(self, matrix: List[List[int]]) -> int:
        m = Counter()
        for row in matrix:
            s = ""
            for v in row:
                s += str(v ^ row[0])
            m[s] += 1
        res = 0
        for v in m.values():
            res = max(res, v)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
