import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1073. 负二进制数相加',
  url: 'https://leetcode.cn/problems/adding-two-negabinary-numbers/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给出基数为 -2 的两个数 arr1 和 arr2，返回两数相加的结果。`,
  solutions: [
//         {
//           script: Script.TS,
//           time: 76,
//           memory:45.5,
//           desc: '利用余数为0判断是否产生分割',
//           code: `function chunk(arr: any[], size: number): any[][] {
//     const res: any[][] = [];
//     const item: any[] = [];
//     for (let i = 1; i <= arr.length; i++) {
//         item.push(arr[i - 1]);
//         if (i % size === 0) res.push([...item]), (item.length = 0);
//     }
//     if (item.length) res.push([...item]);
//     return res;
// }`,
//         },
    {
      script: Script.CPP,
      time: 8,
      memory: 19.1,
      desc: '统一两个数组，如果都1，那可以抵消下一位的1，如果该位需要增加1，可以在该位加1，且下一位加1',
      code: `class Solution {
public:
    vector<int> addNegabinary(vector<int>& arr1, vector<int>& arr2) {
        reverse(arr1.begin(), arr1.end());
        reverse(arr2.begin(), arr2.end());
        for (int i = 0; i < max(arr1.size(), arr2.size()); i++) {
            if (i == arr1.size()) arr1.push_back(0);
            if (i == arr2.size()) arr2.push_back(0);
        }
        vector<int> res;
        for (int i = 0, add = 0; i < arr1.size(); i++) {
            switch (arr1[i] + arr2[i] + add) {
                case -1: res.push_back(1); add = 1; break;
                case 0: res.push_back(0); add = 0; break;
                case 1: res.push_back(1); add = 0; break;
                case 2: res.push_back(0); add = -1; break;
                case 3: res.push_back(1); add = -1; break;
            }
            if (i == arr1.size() - 1 && add != 0) arr1.push_back(0), arr2.push_back(0);
        }
        while (res.size() > 1 && res.back() == 0) res.pop_back();
        reverse(res.begin(), res.end());
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 16.3,
      desc: '同上',
      code: `class Solution:
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
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn add_negabinary(mut arr1: Vec<i32>, mut arr2: Vec<i32>) -> Vec<i32> {
        arr1.reverse();
        arr2.reverse();
        for i in 0..arr1.len().max(arr2.len()) {
            if i == arr1.len() {
                arr1.push(0);
            }
            if i == arr2.len() {
                arr2.push(0);
            }
        }
        let mut res = vec![];
        let (mut i, mut add) = (0, 0);
        while i < arr1.len() {
            match arr1[i] + arr2[i] + add {
                -1 => {
                    res.push(1);
                    add = 1;
                }
                0 => {
                    res.push(0);
                    add = 0;
                }
                1 => {
                    res.push(1);
                    add = 0;
                }
                2 => {
                    res.push(0);
                    add = -1;
                }
                3 => {
                    res.push(1);
                    add = -1;
                }
                _ => {}
            }
            if i == arr1.len() - 1 && add != 0 {
                arr1.push(0);
                arr2.push(0);
            }
            i += 1;
        }
        while res.len() > 1 && *res.last().unwrap() == 0 {
            res.pop();
        }
        res.reverse();
        res
    }
}
`,
    },
  ],
};

export default leetCodeMarkdown;
