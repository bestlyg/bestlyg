from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def checkXMatrix(self, grid: List[List[int]]) -> bool:
        n = len(grid)
        for i in range(n):
            for j in range(n):
                if i == j or i == n - 1 - j:
                    if grid[i][j] == 0:
                        return False
                elif grid[i][j] != 0:
                    return False
        return True



def main():
    o = Solution()
    res = o.greatestLetter("arRAzFif")
    print(res)


main()
