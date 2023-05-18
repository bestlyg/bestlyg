from preclude import *


class Solution:
    def addNegabinary(self, arr1: List[int], arr2: List[int]) -> List[int]:
        arr1.reverse()
        arr2.reverse()
        print(arr1, arr2)
        for i in range(max(len(arr1), len(arr2))):
            if i == len(arr1):
                arr1.append(0)
            if i == len(arr2):
                arr2.append(0)
        res = []
        i = add = 0
        while i < len(arr1):
            match arr1[i] + arr2[i] + add:
                case -1:
                    res.append(1)
                    add = 1
                case 0:
                    res.append(0)
                    add = 0
                case 1:
                    res.append(1)
                    add = 0
                case 2:
                    res.append(0)
                    add = -1
                case 3:
                    res.append(1)
                    add = -1
            if i == len(arr1) - 1 and add != 0:
                arr1.append(0)
                arr2.append(0)
            i += 1
        while len(res) > 1 and res[-1] == 0:
            res.pop()
        res.reverse()
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
