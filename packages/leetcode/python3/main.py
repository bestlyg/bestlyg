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
    def decodeMessage(self, key: str, message: str) -> str:
        list = [''] * 26
        p = 'a'
        for c in key:
            i = ord(c) - ord('a')
            if c != ' ' and list[i] == 0:
                list[i] = p
                p = p + 1
        ans = ''
        for c in message:
            if c == ' ':
                ans += ' '
            else:
                ans += list[ord(c) - ord('a')]
        return ans


def main():
    o = Solution()
    res = o.greatestLetter("arRAzFif")
    print(res)


main()
