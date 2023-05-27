from preclude import *


class Solution:
    def sampleStats(self, count: List[int]) -> List[float]:
        n = len(count)
        minimum = n - 1
        sum = cnt = maximun = mode = mode_cnt = 0
        for i in range(n):
            sum += count[i] * i
            cnt += count[i]
            if count[i]:
                minimum = min(minimum, i)
                maximum = max(maximum, i)
            if count[i] > mode_cnt:
                mode = i
                mode_cnt = count[i]
        mean = sum / cnt
        num1 = num2 = -1
        imid1 = cnt // 2
        imid2 = (cnt - 1) // 2
        icur = 0
        for i in range(n):
            c = count[i]
            if num1 == -1 and imid1 - c < 0:
                num1 = i
            if num2 == -1 and imid2 - c < 0:
                num2 = i
            imid1 -= c
            imid2 -= c
        return [minimum, maximum, mean, (num1+num2)/2, mode]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
