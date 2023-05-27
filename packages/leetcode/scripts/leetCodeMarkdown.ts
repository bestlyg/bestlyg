import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist:!true,
  name: '1093. 大样本统计',
  url: 'https://leetcode.cn/problems/statistics-from-a-large-sample/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `以浮点数数组的形式返回样本的统计信息 [minimum, maximum, mean, median, mode] 。`,
  solutions: [
//     {
//       script: Script.TS,
//       time: 76,
//       memory: 45.3,
//       desc: 'dfs',
//       code: `// 特殊标识符，在左右相等时返回
// }`,
//     },
        {
          script: Script.CPP,
          time: 4,
          memory: 8,
          desc: '遍历',
          code: `class Solution {
public:
    typedef long long ll;
    vector<double> sampleStats(vector<int>& count) {
        ll n = count.size(), sum = 0, minimum = n - 1, maximum = 0, cnt = 0, mode = 0, mode_cnt = 0;
        for (ll i = 0; i < n; i++) {
            sum += count[i] * i;
            cnt += count[i];
            if (count[i]) {
                minimum = min(minimum, i);
                maximum = max(maximum, i);
            }
            if (count[i] > mode_cnt) {
                mode = i;
                mode_cnt = count[i];
            }
        }
        double mean = 1.0 * sum / cnt, num1 = -1, num2 = -1;
        ll imid1 = cnt / 2, imid2 = (cnt - 1) / 2;
        for (ll i = 0; i < n && (num1 == -1 || num2 == -1); i++) {
            ll c = count[i];
            if (num1 == -1 && imid1 - c < 0) num1 = i;
            if (num2 == -1 && imid2 - c < 0) num2 = i;
            imid1 -= c;
            imid2 -= c;
        }
        return vector<double>{ (double)minimum, (double)maximum, mean, (num1 + num2) / 2, (double)mode};
    }
};`,
        },
        {
          script: Script.PY3,
          time: 44,
          memory:16.1,
          desc: '同上',
          code: `class Solution:
    def sampleStats(self, count: List[int]) -> List[float]:
        n = len(count)
        minimum = n - 1
        maximum = sum = cnt = mode = mode_cnt = 0
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
`,
        },
        {
          script: Script.RUST,
          time: 0,
          memory: 2,
          desc: '同上',
          code: `impl Solution {
    pub fn sample_stats(count: Vec<i32>) -> Vec<f64> {
        use std::cmp::{max, min};
        let (n, mut sum, mut minimum, mut maximum, mut cnt, mut mode, mut mode_cnt) =
            (count.len(), 0usize, 0usize, 0usize, 0usize, 0usize, 0usize);
        minimum = n - 1;
        for i in 0..n {
            let c = count[i] as usize;
            sum += c * i;
            cnt += c;
            if c != 0 {
                minimum = min(minimum, i);
                maximum = max(maximum, i);
            }
            if c > mode_cnt {
                mode = i;
                mode_cnt = c;
            }
        }
        let mean = (sum as f64) / (cnt as f64);
        let (mut num1, mut num2) = (-1f64, -1f64);
        let (mut imid1, mut imid2) = ((cnt as f64) / 2.0, ((cnt - 1) as f64) / 2.0);
        for i in 0..n {
            let c = count[i] as f64;
            if num1 == -1.0 && imid1 - c < 0.0 {
                num1 = i as f64;
            }
            if num2 == -1.0 && imid2 - c < 0.0 {
                num2 = i as f64;
            }
            imid1 -= c;
            imid2 -= c;
        }
        return vec![
            minimum as f64,
            maximum as f64,
            mean,
            (num1 + num2) / 2.0,
            mode as f64,
        ];
    }
}`,
        },
  ],
};

export default leetCodeMarkdown;
