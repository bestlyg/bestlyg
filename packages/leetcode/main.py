
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedList

class Solution:
    def findingUsersActiveMinutes(self, logs: List[List[int]], k: int) -> List[int]:
        ans = [0 for _ in range(k)]
        m = {}
        for log in logs:
            s = m.setdefault(log[0], set())
            s.insert(log[1])
        for (_, v) in m.items():
            ans[len(v) - 1] += 1
        return ans



def main():
    o = Solution()
    o.strongPasswordCheckerII("IloveLe3tcode!")


main()
