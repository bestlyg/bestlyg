import { leetcode, trimBlank, resolve, fs, dayjs, specStr } from '../utils';

const { backquote } = specStr;
const {
  LeetCodeScript: Script,
  LeetCodeDifficulty: Difficulty,
  LeetCodeTag: Tag,
  HADER_FACE,
  HADER_LCP,
  HADER_OFFER,
  getNumDirName,
  srcPath,
  solutionReg,
} = leetcode;

interface Solution {
  script: leetcode.LeetCodeScript;
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
  difficulty: leetcode.LeetCodeDifficulty;
  tag: leetcode.LeetCodeTag[];
  solutions: Solution[];
}
const md: Markdown = {
  existMarkdown: true,
  name: '154. 寻找旋转排序数组中的最小值 II',
  url: 'https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找],
  desc:
    '给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。',
  solutions: [
    {
      script: Script.TS,
      time: 92,
      memory: 39.4,
      desc: '直接利用Math',
      code: `function findMin(nums: number[]): number {
        return Math.min.apply({},nums)
    };`,
    },
    {
      script: Script.TS,
      time: 96,
      memory: 39.4,
      desc: '如果相等时排除右侧端点',
      code: `
      function findMin(nums: number[]): number {
        let left = 0;
        let right = nums.length - 1;
        while (left < right) {
          const mid = ~~((left + right) / 2);
          if (nums[mid] < nums[right]) {
            right = mid;
          } else if (nums[mid] > nums[right]) {
            left = mid + 1;
          } else {
            right--;
          }
        }
        return nums[left];
      }`,
    },
  ],
};

const descFormat = (str: string) => (str.endsWith('。') ? str : str + '。');

function main() {
  md.existMarkdown ? addSolution() : addMarkdown();
}
function addMarkdown() {
  fs.writeFileSync(
    analysisPath(),
    `# ${md.name}
    
> 链接：[${md.name}](${md.url})  
> 难度：${md.difficulty}  
> 标签：${md.tag.join('、')}  
> 简介：${descFormat(md.desc)}
      
${md.solutions.map((data, index) => analysisSolution(data, index + 1)).join('\n')}
      `
  );
}
function addSolution() {
  const path = analysisPath();
  const file = fs.readFileSync(path).toString();
  const matchList = file.matchAll(solutionReg);
  let lastIndex = 0;
  for (const match of matchList) lastIndex = parseInt(match[1]);
  fs.writeFileSync(
    analysisPath(),
    file +
      md.solutions.map((data, index) => analysisSolution(data, index + 1 + lastIndex)).join('\n')
  );
}
function analysisPath() {
  const name = trimBlank(md.name);
  let path = '';
  if (name.startsWith(HADER_FACE)) {
    path = HADER_FACE;
  } else if (name.startsWith(HADER_LCP)) {
    path = HADER_LCP;
  } else if (name.startsWith(HADER_OFFER)) {
    path = HADER_OFFER;
  } else {
    path = getNumDirName(name);
  }
  path = resolve(srcPath, path, name + '.md');
  return path;
}
function analysisSolution({ script, time, memory, desc, code }: Solution, index: number) {
  return `## 题解 ${index} - ${script}
- 编辑时间：${dayjs().format('YYYY.MM.DD')}
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
