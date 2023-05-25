from preclude import *


class Solution:
    def oddString(self, words: List[str]) -> str:
        m = dict()
        for w in words:
            key = ""
            for i in range(len(w) - 1):
                key += chr(ord(w[i + 1]) - ord(w[i]) + ord('0'))
            if not key in m: m[key] = []
            m[key].append(w)
        for v in m.values():
            if len(v) == 1:
                return v[0]
        return words[0]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
