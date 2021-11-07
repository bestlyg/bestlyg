import { leetcode, markdown } from './utils';
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: true,
    name: '76. 最小覆盖子串',
    url: 'https://leetcode-cn.com/problems/range-addition-ii/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.数学],
    desc: `给定一个初始元素全部为 0，大小为 m*n 的矩阵 M 以及在 M 上的一系列更新操作。`,
    solutions: [
      {
        script: Script.TS,
        time: 92,
        memory: 41,
        desc: '滑动窗口',
        code: `function minWindow(s: string, t: string): string {
            let cnt = 0;
            const map: Record<string, number> = {};
            for (const ch of t) {
              map[ch] = (map[ch] ?? 0) + 1;
              if (map[ch] === 1) cnt++;
            }
            let l = 0;
            let r = 0;
            let ansLen = s.length + 1;
            let ans = '';
            while (r <= s.length) {
              if (cnt) {
                const ch = s[r];
                if (map[ch] !== undefined) {
                  map[ch]--;
                  if (map[ch] === 0) cnt--;
                }
                r++;
              } else {
                const ch = s[l];
                if (map[ch] !== undefined) {
                  map[ch]++;
                  if (map[ch] === 1) cnt++;
                }
                l++;
              }
              if (cnt === 0 && ansLen > r - l) {
                ans = s.substring(l, r);
                ansLen = ans.length;
              }
            }
            return ans;
          }`,
      },
    ],
  },
  {
    existMarkdown: !true,
    name: '598. 范围求和 II',
    url: 'https://leetcode-cn.com/problems/range-addition-ii/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.数学],
    desc: `给定一个初始元素全部为 0，大小为 m*n 的矩阵 M 以及在 M 上的一系列更新操作。`,
    solutions: [
      {
        script: Script.TS,
        time: 80,
        memory: 40.1,
        desc: '取最小值',
        code: `function maxCount(m: number, n: number, ops: number[][]): number {
            if (ops.length === 0) return m * n;
            let minA = Infinity;
            let minB = Infinity;
            ops.forEach(([a, b]) => {
              minA = Math.min(minA, a);
              minB = Math.min(minB, b);
            });
            return minA * minB;
          }`,
      },
    ],
  },
  {
    existMarkdown: !true,
    name: '468. 验证IP地址',
    url: 'https://leetcode-cn.com/problems/validate-ip-address/',
    difficulty: Difficulty.中等,
    tag: [Tag.字符串],
    desc: `编写一个函数来验证输入的字符串是否是有效的 IPv4 或 IPv6 地址。`,
    solutions: [
      {
        script: Script.TS,
        time: 72,
        memory: 39.5,
        desc: '每一个片段进行解析',
        code: `function checkIpv4(query: string) {
            const list = query.split('.');
            if (list.length !== 4) return false;
            for (const section of list) {
              if (
                section === '' ||
                (section.length > 1 && section[0] === '0') ||
                /[a-zA-Z]+/.test(section) ||
                +section >= 256
              )
                return false;
            }
            return true;
          }
          function checkIpv6(query: string) {
            const list = query.split(':');
            if (list.length !== 8) return false;
            for (const section of list) {
              if (section === '0') continue;
              if (section === '' || section.length > 4 || /[g-zG-Z]+/.test(section)) return false;
            }
            return true;
          }
          function validIPAddress(queryIP: string): string {
            let ipv4 = false;
            let ipv6 = false;
            for (const c of queryIP) {
              if (c === '.') {
                ipv4 = true;
                break;
              } else if (c === ':') {
                ipv6 = true;
                break;
              }
            }
            if (ipv4 && checkIpv4(queryIP)) return 'IPv4';
            if (ipv6 && checkIpv6(queryIP)) return 'IPv6';
            return 'Neither';
          }
          `,
      },
    ],
  },
  {
    existMarkdown: !true,
    name: '89. 格雷编码',
    url: 'https://leetcode-cn.com/problems/gray-code/',
    difficulty: Difficulty.中等,
    tag: [Tag.位运算, Tag.数学, Tag.回溯],
    desc: `给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。`,
    solutions: [
      {
        script: Script.TS,
        time: 140,
        memory: 54.1,
        desc: 'dfs',
        code: `function grayCode(n: number): number[] {
            if (n === 0) return [0];
            const set = new Set<number>([0]);
            const ans: number[] = [0];
            dfs();
            return ans;
            function dfs(num = 0): boolean {
              if (set.size === 2 ** n) {
                return true;
              }
              for (let i = 0; i <= n; i++) {
                const bit = 1 << i;
                const nextNum = num & bit ? num & ~bit : num | bit;
                if (set.has(nextNum)) continue;
                set.add(nextNum);
                ans.push(nextNum);
                if (dfs(nextNum)) return true;
                ans.pop();
                set.delete(nextNum);
              }
              return false;
            }
          }`,
      },
      {
        script: Script.TS,
        time: 108,
        memory: 50.3,
        desc: '后半部分逆序输出',
        code: `function grayCode(n: number): number[] {
            const ans = [0];
            if (n === 0) return ans;
            while (n--) {
              ans.push(
                ...Array.from(ans)
                  .reverse()
                  .map(v => v | (1 << n))
              );
            }
            return ans;
          }`,
      },
    ],
  },
];
