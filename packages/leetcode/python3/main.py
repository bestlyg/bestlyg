from collections import defaultdict
from typing import List, Optional
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict

# global
# nonlocal
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


from queue import Queue
class Solution:
    def minimumMoves(self, grid: List[List[int]]) -> int:
        n = len(grid)
        cache = [[[False for _ in range(2)] for _ in range(n)] for _ in range(n)]
        cache[0][0][0] = True
        q = Queue()
        q.put((0, 0, 0))
        step, size = 0, 1
        while q.qsize():
            (x, y, d) = q.get()
            if x == n - 1 and y == n - 2 and d == 0:
                return step
            if dir == 0 and y + 2 < n and grid[x][y + 2] == 0 and not cache[x][y + 1][0]:
                q.push((x, y + 1, 0));
                cache[x][y + 1][0] = True;
            if dir == 0 and x + 1 < n and grid[x + 1][y + 1] == 0 and grid[x + 1][y] == 0 and not cache[x][y][1]:
                q.push((x, y, 1));
                cache[x][y][1] = True;
            if dir == 0 and x + 1 < n and grid[x + 1][y] == 0 and grid[x + 1][y + 1] == 0 and not cache[x + 1][y][0]:
                q.push((x + 1, y, 0));
                cache[x + 1][y][0] = True;
            if dir == 1 and x + 2 < n and grid[x + 2][y] == 0 and not cache[x + 1][y][1]:
                q.push((x + 1, y, 1));
                cache[x + 1][y][1] = True;
            if dir == 1 and y + 1 < n and grid[x + 1][y + 1] == 0 and grid[x][y + 1] == 0 and not cache[x][y][0]:
                q.push((x, y, 0));
                cache[x][y][0] = True;
            if dir == 1 and y + 1 < n and grid[x + 1][y + 1] == 0 and grid[x][y + 1] == 0 and not cache[x][y + 1][1]:
                q.push((x, y + 1, 1));
                cache[x][y + 1][1] = True;
            size -= 1
            if size == 0:
                 step += 1
                 size = q.qsize()
        return -1
        




def main():
    o = Solution()
    res = o.shortestAlternatingPaths(
        [[0,0,0,0,0,1],
        [1,1,0,0,1,0],
        [0,0,0,0,1,1],
        [0,0,1,0,1,0],
        [0,1,1,0,0,0],
        [0,1,1,0,0,0]]
    )
    print(res)


main()