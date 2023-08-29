from preclude import *


class Solution:
    def numFactoredBinaryTrees(self, arr: List[int]) -> int:
        MOD = 1000000007
        n = len(arr)
        res = 1
        arr.sort()
        m = {}
        for i in range(n):
            m[arr[i]] = i
        list = [1 for _ in range(n)]
        for i in range(n):
            for j in range(i-1, -1, -1):
                if arr[i] % arr[j] == 0 and arr[i] // arr[j] in m:
                    list[i] = (list[i] + list[j] *
                               list[m[arr[i] / arr[j]]] % MOD) % MOD
            res = (res + list[i]) % MOD
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
