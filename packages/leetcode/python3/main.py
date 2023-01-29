from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedDict


class Solution:
    def countAsterisks(self, s: str) -> int:
        list = s.split('|')
        ans = 0
        for i in range(len(list)):
            if i % 2 == 0:
                for c in list[i]:
                    if c == '*':
                        ans += 1
        return ans


def main():
    o = Solution()
    res = o.greatestLetter("arRAzFif")
    print(res)


main()
