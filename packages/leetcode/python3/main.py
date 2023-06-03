from preclude import *


class Solution:
    def maxRepOpt1(self, text: str) -> int:
        m = [[] for _ in range(26)]
        res = 0
        n = len(text)
        i = 0
        while i < n:
            start = i
            while i + 1 < n and text[i + 1] == text[start]:
                i += 1
            m[ord(text[start]) - ord('a')].append((start, i))
            res = max(res, i - start + 1)
        for list in m:
            n = len(list)
            for i in range(n):
                if n != 1:
                    res = max(res, list[i][1] - list[i][0] + 2)
                if i + 1 < n and list[i][1] + 1 == list[i + 1][0] - 1:
                    val = list[i][1] - list[i][0] + 1 + \
                        list[i + 1][1] - list[i + 1][0] + 1
                    if not (i == 0 and i + 2 == n):
                        val += 1
                    res = max(res, val)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
