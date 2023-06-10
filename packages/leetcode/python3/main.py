from preclude import *


class Solution:
    def numSmallerByFrequency(self, queries: List[str], words: List[str]) -> List[int]:
        def f(w: str):
            cnt = 0
            ch = ord('z')
            for c in w:
                if ord(c) < ch:
                    ch = c
                    cnt = 1
                elif ord(c) == ch:
                    cnt += 1
            return cnt
        ws = [f(w) for w in words]
        ws.sort()

        def query(q: str):
            target = f(q)
            l = 0
            r = len(words)
            while l < r:
                m = (l + r)//2
                if target < ws[m]:
                    r = m
                else:
                    l = m + 1
            return len(words) - l

        return [
            query(q) for q in queries
        ]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
