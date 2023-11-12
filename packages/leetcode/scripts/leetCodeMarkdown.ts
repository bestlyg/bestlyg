import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '715. Range 模块',
    url: 'https://leetcode.cn/problems/range-module',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `Range模块是跟踪数字范围的模块。设计一个数据结构来跟踪表示为 半开区间 的范围并查询它们。`,
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
            date: new Date('2022.06.20').getTime(),
            script: Script.CPP,
            time: 200,
            memory: 66.95,
            desc: '有序集合',
            code: `class RangeModule {
public:
    RangeModule() {}
    
    void addRange(int left, int right) {
        auto it = intervals.upper_bound(left);
        if (it != intervals.begin()) {
            auto start = prev(it);
            if (start->second >= right) {
                return;
            }
            if (start->second >= left) {
                left = start->first;
                intervals.erase(start);
            }
        }
        while (it != intervals.end() && it->first <= right) {
            right = max(right, it->second);
            it = intervals.erase(it);
        }
        intervals[left] = right;
    }
    
    bool queryRange(int left, int right) {
        auto it = intervals.upper_bound(left);
        if (it == intervals.begin()) {
            return false;
        }
        it = prev(it);
        return right <= it->second;
    }
    
    void removeRange(int left, int right) {
        auto it = intervals.upper_bound(left);
        if (it != intervals.begin()) {
            auto start = prev(it);
            if (start->second >= right) {
                int ri = start->second;
                if (start->first == left) {
                    intervals.erase(start);
                }
                else {
                    start->second = left;
                }
                if (right != ri) {
                    intervals[right] = ri;
                }
                return;
            }
            else if (start->second > left) {
                start->second = left;
            }
        }
        while (it != intervals.end() && it->first < right) {
            if (it->second <= right) {
                it = intervals.erase(it);
            }
            else {
                intervals[right] = it->second;
                intervals.erase(it);
                break;
            }
        }
    }

private:
    map<int, int> intervals;
};`,
        },
        {
            script: Script.PY,
            time: 480,
            memory: 20.4,
            desc: '有序数组，每次合并数组',
            code: `from sortedcontainers import SortedList
class RangeModule:
    def __init__(self):
        self.arr = SortedList([(-1, -1), (inf, inf)])

    def addRange(self, left: int, right: int) -> None:
        arr = self.arr
        item = (left, right)
        idx = arr.bisect_left(item)
        if arr[idx - 1][1] >= left:
            item = (arr[idx - 1][0], max(arr[idx - 1][1], item[1]))
            arr.pop(idx - 1)
            idx -= 1
        while arr[idx][0] <= item[1]:
            item = (item[0], max(arr[idx][1], item[1]))
            arr.pop(idx)
        arr.add(item)

    def queryRange(self, left: int, right: int) -> bool:
        arr = self.arr
        idx = arr.bisect_right((left, inf))
        return arr[idx - 1][0] <= left and arr[idx - 1][1] >= right

    def removeRange(self, left: int, right: int) -> None:
        arr = self.arr
        idx = arr.bisect_left((left, right))
        if arr[idx - 1][1] > left:
            if arr[idx - 1][1] > right:
                arr.add((right, arr[idx - 1][1]))
            item = (arr[idx - 1][0], left)
            arr.pop(idx - 1)
            arr.add(item)
        while arr[idx][1] <= right:
            arr.pop(idx)
        if arr[idx][0] <= right:
            item = (right, arr[idx][1])
            arr.pop(idx)
            if item[0] != item[1]:
                arr.add(item)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
