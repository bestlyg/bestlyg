import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2591. 将钱分给最多的儿童',
    url: 'https://leetcode.cn/problems/distribute-money-to-maximum-children',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你按照上述规则分配金钱，并返回 最多 有多少个儿童获得 恰好 8 美元。如果没有任何分配方案，返回 -1 。`,
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
            time: 4,
            memory: 6.05,
            desc: '贪心计算',
            code: `class Solution {
public:
    int distMoney(int money, int children) {
        if (money < children) return -1;
        int cnt = money / 8, surplus_money = money % 8, surplus_children = children - cnt;
        if (cnt == children) return surplus_money == 0 ? children : children - 1;
        if (cnt > children) return children - 1;
        if (surplus_money == surplus_children) return cnt;
        if (surplus_money > surplus_children) return surplus_children == 1 and surplus_money == 4 ? cnt - 1 : cnt;
        return cnt - ceil(1.0 * (surplus_children - surplus_money) / 7.0);
    }
};`,
        },
        {
            script: Script.PY,
            time: 52,
            memory: 15.61,
            desc: '同上',
            code: `class Solution:
    def distMoney(self, money: int, children: int) -> int:
        if money < children:
            return -1
        cnt = money // 8
        surplus_money = money % 8
        surplus_children = children - cnt
        if cnt == children:
            if surplus_money == 0:
                return children
            return children - 1
        if cnt > children:
            return children - 1
        if surplus_money == surplus_children:
            return cnt
        if surplus_money > surplus_children:
            if surplus_children == 1 and surplus_money == 4:
                return cnt - 1
            return cnt
        return cnt - ceil((surplus_children - surplus_money) / 7)
`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.58,
            desc: '同上',
            code: `impl Solution {
    pub fn dist_money(money: i32, children: i32) -> i32 {
        if money < children {
            -1
        } else {
            let (cnt, surplus_money) = (money / 8, money % 8);
            let surplus_children = children - cnt;
            if cnt == children {
                if surplus_money == 0 {
                    children
                } else {
                    children - 1
                }
            } else if cnt > children {
                children - 1
            } else if surplus_money == surplus_children {
                cnt
            } else if surplus_money > surplus_children {
                if surplus_children == 1 && surplus_money == 4 {
                    cnt - 1
                } else {
                    cnt
                }
            } else {
                cnt - ((surplus_children - surplus_money) as f64 / 7.0).ceil() as i32
            }
        }
    }
}
`,
        },
    ],
};

export default leetCodeMarkdown;
