import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1333. 餐厅过滤器',
    url: 'https://leetcode.cn/problems/pass-the-pillow',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `过滤后返回餐馆的 id，按照 rating 从高到低排序。如果 rating 相同，那么按 id 从高到低排序。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 88,
            memory: 26.94,
            desc: '遍历',
            code: `class Solution {
public:
    vector<int> filterRestaurants(vector<vector<int>>& restaurants, int veganFriendly, int maxPrice, int maxDistance) {
        vector<pair<int, int>> list;
        for (auto &item : restaurants) {
            if (item[3] <= maxPrice && item[4] <= maxDistance and (!veganFriendly || item[2])) {
                list.push_back(make_pair(item[0], item[1]));
            }
        }
        sort(list.begin(), list.end(), [&](auto &a, auto &b) {
            return a.second != b.second ? a.second < b.second : a.first < b.first;
        });
        reverse(list.begin(), list.end());
        vector<int> res;
        for (auto &item : list) res.push_back(item.first);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 64,
            memory: 23.1,
            desc: '同上',
            code: `class Solution:
    def filterRestaurants(self, restaurants: List[List[int]], veganFriendly: int, maxPrice: int, maxDistance: int) -> List[int]:
        restaurants = [item for item in restaurants if item[3] <=
                        maxPrice and item[4] <= maxDistance and (not veganFriendly or item[2])]
        restaurants.sort(key=lambda item: (item[1], item[0]), reverse=True)
        return [item[0] for item in restaurants]`,
        },
        {
            script: Script.RUST,
            time: 8,
            memory: 3.11,
            desc: '同上',
            code: `impl Solution {
    pub fn filter_restaurants(
        restaurants: Vec<Vec<i32>>,
        vegan_friendly: i32,
        max_price: i32,
        max_distance: i32,
    ) -> Vec<i32> {
        let mut restaurants: Vec<Vec<i32>> = restaurants
            .into_iter()
            .filter(|item| {
                item[3] <= max_price
                    && item[4] <= max_distance
                    && (vegan_friendly == 0 || item[2] == 1)
            })
            .collect();
        restaurants.sort_by(|item1, item2| {
            if item1[1] != item2[1] {
                item2[1].cmp(&item1[1])
            } else {
                item2[0].cmp(&item1[0])
            }
        });
        restaurants.into_iter().map(|item| item[0]).collect()
    }
}
`,
        },
    ],
};

export default leetCodeMarkdown;
