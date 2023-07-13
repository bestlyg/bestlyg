from preclude import *


class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        for i in range(1, n):
            for j in range(n):
                val = matrix[i][j] + matrix[i-1][j]
                if j > 0:
                    val = min(val, matrix[i][j] + matrix[i-1][j-1])
                if j < n-1:
                    val = min(val, matrix[i][j] + matrix[i-1][j+1])
                matrix[i][j] = val
        return min(matrix[n-1])


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
