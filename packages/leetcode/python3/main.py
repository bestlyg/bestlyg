from preclude import *


def get_primes2(n: int) -> List[bool]:
    n += 3
    primes = [True for _ in range(n)]
    primes[0] = primes[1] = False
    for i in range(2, n):
        if primes[i]:
            j = 2
            while i * j < n:
                primes[i*j] = False
                j += 1
    return primes


class Solution:
    def findPrimePairs(self, n: int) -> List[List[int]]:
        primes = get_primes2(n)
        res = []
        if n >= 2 and primes[n-2]:
            res.append([2, n-2])
        for i in range(3, n//2 + 1, 2):
            if primes[i] and primes[n-i]:
                res.append([i, n-i])
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
