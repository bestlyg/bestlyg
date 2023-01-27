from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedDict


class Solution:
    def greatestLetter(self, s: str) -> str:
        ans = ""
        sset = set()
        for i, c in enumerate(s):
            sset.add(c)
            if c.isupper() and c.lower() in sset and (ans == "" or ans[0] < c) or c.islower() and c.upper() in sset and (ans == "" or ans[0] < c.upper()):
                 ans = c.upper()
            print(i, c, ans)
        return ans



def main():
    o = Solution()
    res = o.greatestLetter("arRAzFif")
    print(res)

main()
