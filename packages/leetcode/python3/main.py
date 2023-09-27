from math import *
from preclude import *


class Solution:
    def filterRestaurants(self, restaurants: List[List[int]], veganFriendly: int, maxPrice: int, maxDistance: int) -> List[int]:
        restaurants = [item for item in restaurants if item[3] <=
                       maxPrice and item[4] <= maxDistance and (not veganFriendly or item[2])]
        restaurants.sort(key=lambda item: (item[1], item[0]), reverse=True)
        return [item[0] for item in restaurants]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
