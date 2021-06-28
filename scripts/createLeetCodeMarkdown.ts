import { leetcode, trimBlank, resolve, fs, moment, specStr, LOGO, markdown } from './utils';

const { backquote } = specStr;
const { link } = markdown;
const { Script, Difficulty, Tag, srcPath, solutionReg, getDirOrder, getFileOrder, getDirName } =
  leetcode;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;

interface Solution {
  script: Script;
  time: number;
  memory: number;
  desc: string;
  code: string;
}
interface Markdown {
  existMarkdown: boolean;
  name: string;
  url: string;
  desc: string;
  difficulty: Difficulty;
  tag: Tag[];
  solutions: Solution[];
}
const md: Markdown = {
  existMarkdown: false,
  name: '815. 公交路线',
  url: 'https://leetcode-cn.com/problems/bus-routes/',
  difficulty: Difficulty.困难,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.哈希表],
  desc: '求出 最少乘坐的公交车数量 。如果不可能到达终点车站，返回 -1 。',
  solutions: [
    {
      script: Script.TS,
      time: 268,
      memory: 71.6,
      desc: '广度优先搜索，储存站点信息和公交换站信息',
      code: `function numBusesToDestination(routes: number[][], source: number, target: number): number {
        if (source === target) return 0;
        const stationMap = new Map<number, Set<number>>();
        for (let routeIndex = 0, routeLen = routes.length; routeIndex < routeLen; routeIndex++) {
          const route = routes[routeIndex];
          for (
            let stationIndex = 0, stationLen = route.length;
            stationIndex < stationLen;
            stationIndex++
          ) {
            const station = route[stationIndex];
            let set = stationMap.get(station);
            if (!set) stationMap.set(station, (set = new Set()));
            set.add(routeIndex);
          }
        }
        const busMap = new Map<number, Set<number>>();
        for (const busList of stationMap.values()) {
          if (busList.size === 1) continue;
          for (const bus of busList) {
            let set = busMap.get(bus);
            if (!set) busMap.set(bus, (set = new Set()));
            for (const nextBus of busList) if (nextBus !== bus) set.add(nextBus);
          }
        }
        const FIRST_BUS = stationMap.get(source)!;
        const LAST_BUS = stationMap.get(target)!;
        if (!FIRST_BUS || !LAST_BUS || FIRST_BUS.size === 0 || LAST_BUS.size === 0) return -1;
        for (const bus of FIRST_BUS) if (LAST_BUS.has(bus)) return 1;
        let ans = Infinity;
        const stepMap = new Map<number, number>();
        for (const bus of FIRST_BUS) stepMap.set(bus, 1);
        const queue: number[] = [...FIRST_BUS];
        while (queue.length !== 0) {
          const bus = queue.shift()!;
          const step = stepMap.get(bus)!;
          if (LAST_BUS.has(bus)) {
            ans = Math.min(ans, step);
            continue;
          }
          const nextBusList = busMap.get(bus)!;
          for (const nextBus of nextBusList ?? []) {
            if (!stepMap.has(nextBus)) queue.push(nextBus);
            stepMap.set(nextBus, Math.min(stepMap.get(nextBus) ?? Infinity, step + 1));
          }
        }
        return ans === Infinity ? -1 : ans;
      }`,
    },
  ],
};
const dirName = getDirName(md.name);
const dirPath = resolve(srcPath, dirName);
const filePath = resolve(dirPath, trimBlank(md.name) + '.md');
const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  console.log(LOGO);
  md.existMarkdown ? addSolution() : addMarkdown();
}
function addMarkdown() {
  fs.writeFileSync(
    filePath,
    `---
title: ${md.name}
order: ${getFileOrder(md.name)}
nav:
  title: 力扣题解
  path: /leetcode
  order: 4
group:
  title: ${dirName}
  path: /${dirName}
  order: ${getDirOrder(dirName)}
---

# ${md.name}
    
> 链接：[${md.name}](${md.url})  
> 难度：${md.difficulty}  
> 标签：${md.tag.join('、')}  
> 简介：${descFormat(md.desc)}
      
${md.solutions.map((data, index) => analysisSolution(data, index + 1)).join('\n')}
      `
  );
}
function addSolution() {
  const path = filePath;
  const file = fs.readFileSync(path).toString();
  const matchList = file.matchAll(solutionReg);
  let lastIndex = 0;
  for (const match of matchList) lastIndex = parseInt(match[1]);
  fs.writeFileSync(
    filePath,
    file +
      md.solutions.map((data, index) => analysisSolution(data, index + 1 + lastIndex)).join('\n')
  );
}
function analysisSolution({ script, time, memory, desc, code }: Solution, index: number) {
  return `## 题解 ${index} - ${script}
- 编辑时间：${moment().format('YYYY.MM.DD')}
- 执行用时：${time}ms
- 内存消耗：${memory}mb
- 编程语言：${script}
- 解法介绍：${descFormat(desc)}
${backquote}${backquote}${backquote}${script}
${code}
${backquote}${backquote}${backquote}
`;
}
main();
