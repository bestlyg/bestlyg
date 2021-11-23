import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
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
    name: '859. 亲密字符串',
    url: 'https://leetcode-cn.com/problems/longest-harmonious-subsequence/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.哈希表, Tag.排序],
    desc: `现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度。`,
    solutions: [
      {
        script: Script.TS,
        time: 80,
        memory: 40.9,
        desc: '校验字符错位个数',
        code: `function buddyStrings(s: string, goal: string): boolean {
          const getmap = (str: string) =>
            str.split('').reduce<Record<string, number>>((map, ch) => {
              map[ch] = (map[ch] ?? 0) + 1;
              return map;
            }, {});
          const map1 = getmap(s);
          const map2 = getmap(goal);
          if (Object.entries(map1).some(([k, v]) => map2[k] !== v)) return false;
          let cnt = 0;
          const len = s.length;
          for (let i = 0; i < len; i++) {
            if (s[i] !== goal[i]) cnt++;
          }
          if(cnt === 0 )return Object.values(map1).some(v=>v>=2)
          if (cnt !== 2) return false;
          return true;
        }`,
      },
      {
        script: Script.C,
        time: 0,
        memory: 5.6,
        desc: '校验字符错位个数',
        code: `bool buddyStrings(char * s, char * goal){
    if (strlen(s) != strlen(goal)) return false;
    int map1[26] = {0}, map2[26] = {0}, len = strlen(s), has_repeat = 0;
    for (int i = 0; i < len; i++) {
        map1[s[i] - 'a']++;
        map2[goal[i] - 'a']++;
    }
    for (int i = 0; i < 26; i++) {
        if (map1[i] != map2[i]) return false;
        if (map1[i] >= 2) has_repeat = 1;
    }
    int cnt = 0;
    for (int i = 0; i < len; i++) {
        if (s[i] != goal[i]) {
            if (++cnt > 2) return false;
        }
    }
    if (cnt == 0) return has_repeat == 1;
    return true;
}`,
      },
    ],
  },
];
