from bisect import bisect_left, bisect_right
from functools import cache, reduce
from heapq import *
from collections import defaultdict, deque
from itertools import accumulate
from string import ascii_lowercase
from typing import Callable, List, Optional, Tuple
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict, SortedSet, SortedList, SortedKeyList
from math import *
from typing import Any

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


dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]


class Node:
    def __init__(self, row: int, col: int, time: int):
        self.row = row
        self.col = col
        self.time = time

    def __lt__(self, o: 'Node') -> bool:
        return self.time < o.time


class TrieNode:
    def __init__(self) -> None:
        self.end = False
        self.fail = None
        self.children: List[TrieNode] = [None] * 26


def gcd(a: int, b: int):
    if a < b:
        return gcd(b, a)
    if b == 0:
        return a
    return gcd(b, a % b)


def cmp(s1: str, s2: str, i1: int, i2: int, err: int):
    if i1 == s1.size():
        return i2 + err == s2.size()
    if i2 == s2.size():
        return i1 + err == s1.size()
    if s1[i1] == s2[i2]:
        return cmp(s1, s2, i1 + 1, i2 + 1, err)
    if err == 0:
        return False
    return cmp(s1, s2, i1 + 1, i2, err - 1) or cmp(s1, s2, i1, i2 + 1, err - 1)


def sort3(a: int, b: int, c: int) -> Tuple[int, int, int]:
    if a > c:
        a, c = c, a
    if a > b:
        a, b = b, a
    if b > c:
        b, c = c, b
    return (a, b, c)


class UnionFind:
    def __init__(self, n) -> None:
        self.n = n
        self.data = [i for i in range(0, n)]
        self.sizes = [1] * n
        self.cnt = n
    def size(self, v: int) -> int:
        return self.sizes[self.find(v)]
    def find(self, v: int) -> int:
        if self.data[v] != v:
            self.data[v] = self.find(self.data[v])
        return self.data[v]
    def uni(self, v1: int, v2: int):
        p1 = self.find(v1)
        p2 = self.find(v2)
        if p1 != p2:
            self.sizes[p1] += self.sizes[p2]
            self.cnt -= self.sizes[p2]
            self.data[p2] = p1
    def same(self, v1: int, v2: int):
        return self.find(v1) == self.find(v2)


def pos2Idx(x: int, y: int, size: int):
    return x * size + y


def idx2pox(idx: int, size: int) -> Tuple[int,  int]:
    return (idx // size, idx % size)


def get_primes(n: int) -> List[int]:
    n += 3
    primes = [0 for _ in range(n + 3)]
    for i in range(2, n):
        if primes[i] == 0:
            primes[0] += 1
            primes[primes[0]] = i
        j = 1
        while j <= primes[0] and i * primes[j] < n:
            primes[i * primes[j]] = 1
            if i % primes[j] == 0:
                break
            j += 1
    return primes


def get_primes2(n: int) -> List[bool]:
    n += 1
    primes = [True for _ in range(n)]
    primes[0] = primes[1] = False
    for i in range(2, n):
        if primes[i]:
            j = 2
            while i * j < n:
                primes[i*j] = False
                j += 1
    return primes

def digit_dp(n: int, min_num: str, max_num: str, min_sum: int, max_sum: int):
    @cache
    def dfs(i: int, val: int, limit_low: bool, limit_high: bool) -> int:
        if val > max_sum: return 0
        if i == n: return val >= min_sum
        lo = int(min_num[i]) if limit_low else 0
        hi = int(max_num[i]) if limit_high else 9
        return sum(
            dfs(i + 1, val + d, limit_low and lo == d, limit_high and hi == d)
            for d in range(lo, hi + 1)
        )
    return  dfs

def quick_base(a: int, b: int, mod: int, init: int, combine: Callable[[int, int], int], transform: Callable[[int, int], int]) -> int:
    ans = init
    while b:
        if b & 1: ans = combine(ans, temp) % mod
        temp = transform(temp, temp) % mod
        b >>= 1
    return ans

def quick_mul(a: int, b: int, mod: int) -> int:
    fn = lambda a, b: a + b
    return quick_base(a, b, mod, 0, fn, fn)

def quick_pow(a: int, b: int, mod: int) -> int:
    fn = lambda a, b: a * b
    return quick_base(a, b, mod, 1, fn, fn)

class BitMap:
    def __init__(self, n: int):
        self.size = 64
        self.buckets = [0] * n
    def add(self, key: int):
        self.set(key // self.size, key % self.size, True)
    def remove(self, key: int):
        self.set(key // self.size, key % self.size, False)
    def contains(self, key: int):
        return self.get(key // self.size, key % self.size)
    def set(self, bucket: int, loc: int, val: bool):
        if val:
            self.buckets[bucket] |= 1 << loc
        else:
            self.buckets[bucket] = self.buckets[bucket] & ~(1 << loc)
    def get(self, bucket: int, loc: int):
        return bool((self.buckets[bucket] >> loc) & 1)