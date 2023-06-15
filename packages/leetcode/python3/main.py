from preclude import *


class Solution:
    def canMakePaliQueries(self, s: str, queries: List[List[int]]) -> List[bool]:
        list = [1]
        for c in s:
            list.append(list[-1] ^ (1 << (ord(c) - ord('a'))))

        def check(q: List[int]):
            l, r, k = q[0], q[1], q[2]
            val = list[r+1] ^ list[l]
            cnt = 0
            for i in range(26):
                if val & (1 << i):
                    cnt += 1
            if (r-l+1) % 2:
                return 2 * k >= cnt - 1
            else:
                return 2 * k >= cnt

        return [check(q) for q in queries]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
