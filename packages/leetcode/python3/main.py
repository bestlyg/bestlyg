from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedDict


class Solution:
    def getSmallestString(self, n: int, k: int) -> str:
        ans = ''.join(['a'] * n)
        k -= n
        for i in range(n - 1, 0, -1):
            print(i, ans, k)
            if k >= 25:
                ans = ans[:i] + "z" + ans[i + 1:]
                k -= 25
            else:
                ans = ans[:i] + chr(k + ord('a')) + ans[i + 1:]
                k = 0
            if not k:
                break
        return ans


def main():
    o = Solution()
    res = o.getSmallestString(3, 27)
    print(res)

main()
