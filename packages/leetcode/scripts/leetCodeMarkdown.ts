import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '901. 股票价格跨度',
    url: 'https://leetcode.cn/problems/online-stock-span/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `设计一个算法收集某些股票的每日报价，并返回该股票当日价格的 跨度 。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 240,
            memory: 80.53,
            desc: '单调栈',
            code: `class StockSpanner {
public:
    int idx;
    vector<pair<int, int>> arr;
    StockSpanner(): idx(0), arr(vector<pair<int, int>>()) {}
    int next(int price) {
        while (arr.size() && arr.back().second <= price) arr.pop_back();
        idx += 1;
        int res = idx - (arr.size() ? arr.back().first : 0);
        arr.push_back(make_pair(idx, price));
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 356,
            memory: 20.68,
            desc: '同上',
            code: `class StockSpanner:

    def __init__(self):
        self.idx = 0
        self.arr = []

    def next(self, price: int) -> int:
        while self.arr and self.arr[-1][1] <= price:
            self.arr.pop()
        self.idx += 1
        res = self.idx - (self.arr[-1][0] if self.arr else 0)
        self.arr.append((self.idx, price))
        return res
`,
        },
        {
            script: Script.RUST,
            time: 28,
            memory: 6.27,
            desc: '同上',
            code: `struct StockSpanner {
    idx: usize,
    arr: Vec<(usize, i32)>,
}

impl StockSpanner {
    fn new() -> Self {
        Self {
            idx: 0,
            arr: vec![],
        }
    }

    fn next(&mut self, price: i32) -> i32 {
        while !self.arr.is_empty() && self.arr.last().unwrap().1 <= price {
            self.arr.pop();
        }
        self.idx += 1;
        let res = self.idx
            - (if self.arr.is_empty() {
                0
            } else {
                self.arr.last().unwrap().0
            });
        self.arr.push((self.idx, price));
        res as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
