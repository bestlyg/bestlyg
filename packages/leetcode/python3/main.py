from preclude import *


class Solution:
    def findReplaceString(self, s: str, indices: List[int], sources: List[str], targets: List[str]) -> str:
        n = len(indices)
        idxs = [i for i in range(n)]
        idxs.sort(key=lambda i: indices[i], reverse=True)
        for idx in range(n):
            i = idxs[idx]
            if s[indices[i]:indices[i]+len(sources[i])] == sources[i]:
                print('in')
                s = s[0:indices[i]] + targets[i] + \
                    s[indices[i]:indices[i]+len(sources[i])]
        return s


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
