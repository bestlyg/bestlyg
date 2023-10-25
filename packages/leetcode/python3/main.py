from preclude import *


class Solution:
    def pileBox(self, box: List[List[int]]) -> int:
        n = len(box)
        box.sort(key=lambda o: o[0] * o[1] * o[2], reverse=True)
        dp = [0] * n
        for i in range(n):
            dp[i] = box[i][2]
            for j in range(i - 1, -1, -1):
                if box[i][0] < box[j][0] or box[i][1] < box[j][1] or box[i][2] < box[j][2]:
                    dp[i] = max(dp[i], dp[j] + box[i][2])
        return max(dp)
        # @cache
        # def dfs(idx: int, prev: int) -> int:
        #     if idx == n: return 0
        #     res = dfs(idx + 1, prev)
        #     if box[idx][0] >= box[prev][0] or box[idx][1] >= box[prev][1] or box[idx][2] >= box[prev][2]: return res
        #     return max(dfs(idx + 1, idx) + box[idx][2], res)
        # return max(dfs(i + 1, i) + box[i][2] for i in range(n))


# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner()
# param_1 = obj.next(price)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
