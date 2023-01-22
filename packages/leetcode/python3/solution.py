from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedDict


class Solution:
    def maxHappyGroups(self, batchSize: int, groups: List[int]) -> int:
        cache = defaultdict()
        m = SortedDict()
        nsum = 0
        for group in groups:
            num = group % batchSize
            print("num = ", num )
            if num == 0:
                nsum += 1
                print(1)
            elif (batchSize - num) in m:
                m[batchSize - num] -= 1
                nsum += 1
                print(2)
            else:
                item = m.setdefault(num, 0)
                m[num] = item + 1
                print(3)
        def trans(m: SortedDict):
            ans = 0
            i = 0
            for item in m.values():
                ans |= item << (4 * i)
                i += 1
            return ans
        
        for k, v in m.items():
            print(k, v)

        def dfs(m: SortedDict, surplus: int):
            print("dfs")
            for k, v in m.items():
                print(k, v)
            cachek = trans(m)
            if cachek in cache:
                return cache[cachek]
            res = 0
            for k in m.keys():
                if m[k] == 0:
                    continue
                m[k] -= 1
                res = max(res, (surplus == 0) +
                          dfs(m, (batchSize - k + surplus) % batchSize))
                m[k] += 1
            cache[cachek] = res
            return res
        print("nsum", nsum)
        return nsum + dfs(m, 0)



3
[1,2,3,4,5,6]
9
[3,1,3,3,5,6,1,1,9,10,3,3,3,1,1,3,3,3,19,20,1,3,3,3,3,1,1,3,3,30]