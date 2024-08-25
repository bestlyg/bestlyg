from preclude import *

'''
1 0 
  1 总共2的总和: 0
2 00 总共2的总和: 2 * 1 + 2 * 0 = 2
  01 
  10
  11
3 000 总共2的总和：4 * 2 + 2 * 2 = 12
  001
  010
  011
  100
  101
  110
  111
第n层的数量：pow(2,n-1)*(n-1)
n层总和：第n层的数量+第n-1层的数量*2

1 0 
  1 总共1的总和: 1
2 00 总共1的总和: 4
  01 
  10
  11
3 000 总共1的总和: 4 + 2 * 4
  001
  010
  011
  100
  101
  110
  111
n: pow(2,n-1) + 2 * get(n-1)
'''


def get_count(n: int) -> int:
    if n <= 1:
        return 0
    return pow(2, n - 1) * (n - 1) + 2 * get_count(n - 1)


def get_count2(n: int) -> int:
    if n <= 1:
        return n
    return pow(2, n-1) + 2 * get_count2(n - 1)


def get_level(idx: int) -> int:
    l = 0
    r = 64
    while l < r:
        m = (l + r) // 2
        # print(f't = {idx}, l = {l}, r = {r}, m = {m}')
        v = get_count2(m) - 1
        # print(f't = {idx}, l = {l}, r = {r}, m = {m}, v = {v}')
        if v < idx:
            l = m + 1
        else:
            r = m
    return l


class Solution:
    def run(self, data: Any) -> Any:
        return self.findProductsOfElements(data)

    def findProductsOfElements(self, queries: List[List[int]]) -> List[int]:
        def dfs(start: int, end: int, mod: int) -> int:
            print(f'===> start = {start}, end = {end}, mod = {mod}')
            if end == 0:
                return 1
            start_level = get_level(start)
            end_level = get_level(end)
            print(
                f'===> start = {start}, end = {end}, mod = {mod}, sl = {start_level}, el = {end_level}')
            res = 1
            if start_level != end_level:
                next_start = get_count2(start_level)
                res *= dfs(next_start, end, mod)
                end = next_start - 1
                end_level = start_level
            print(
                f'===> start = {start}, end = {end}, mod = {mod}, sl = {start_level}, el = {end_level}, res = {res}')
            return res
        return [
            dfs(q[0], q[1], q[2])
            for q in queries[0:1]
        ]


data = [[1, 4, 7]]


def main():
    o = Solution()
    print(o.run(data))


main()
