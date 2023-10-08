import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2034. 股票价格波动',
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
        // {
        //     script: Script.CPP,
        //     time: 240,
        //     memory: 80.53,
        //     desc: '单调栈',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 1140,
            memory: 57.04,
            desc: '有序集合',
            code: `from sortedcontainers import SortedDict
class StockPrice:

    def __init__(self):
        self.cur_time = -1
        self.cur_price = 0
        self.time_map = SortedDict()
        self.max_map = SortedDict()
        self.min_map = SortedDict()

    def update_map(self, map, key, d):
        if key not in map: map[key] = 0
        map[key] += d
        if map[key] == 0: del map[key]

    def update(self, timestamp: int, price: int) -> None:
        if timestamp in self.time_map: 
            cur_price = self.time_map[timestamp]
            self.update_map(self.max_map, cur_price, -1)
            self.update_map(self.min_map, cur_price, -1)
        self.update_map(self.max_map, price, 1)
        self.update_map(self.min_map, price, 1)
        self.time_map[timestamp] = price
        if self.cur_time <= timestamp:
            self.cur_time = timestamp
            self.cur_price = price

    def current(self) -> int:
        return self.cur_price

    def maximum(self) -> int:
        return self.max_map.keys()[-1]

    def minimum(self) -> int:
        return self.min_map.keys()[0]
`,
        },
        // {
        //     script: Script.RUST,
        //     time: 28,
        //     memory: 6.27,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
