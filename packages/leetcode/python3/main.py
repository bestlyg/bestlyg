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
    def mergeInBetween(self, list1: ListNode, a: int, b: int, list2: ListNode) -> ListNode:
        p1, p2 = list1, list2
        for _ in range(a - 1):
            p1 = p1.next
        tmp = p1.next
        p1.next = list2
        p1 = tmp
        while p2.next:
            p2 = p2.next
        for _ in range(b - a):
            p1 = p1.next
        p2.next = p1.next
        return list1


def main():
    o = Solution()
    res = o.greatestLetter("arRAzFif")
    print(res)


main()
