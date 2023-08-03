from preclude import *


class Solution:
    def removeComments(self, source: List[str]) -> List[str]:
        res = []
        check = False
        s = ""
        for line in source:
            i = 0
            while i < len(line):
                if line[i] == '*' and i + 1 < line.size() and line[i + 1] == '/' and check:
                    check = False
                    i += 1
                elif check:
                    pass
                elif line[i] == '/' and i + 1 < line.size() and line[i + 1] == '*':
                    check = True
                    i += 1
                elif line[i] == '/' and i + 1 < line.size() and line[i + 1] == '/':
                    break
                else:
                    s += line[i]
                i += 1
            if not check and len(s):
                res.append(s)
                s = ""
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
