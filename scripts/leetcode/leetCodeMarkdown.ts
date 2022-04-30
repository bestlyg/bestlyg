import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '908. 最小差值 I',
  url: 'https://leetcode-cn.com/problems/construct-quad-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.数组, Tag.分治, Tag.矩阵],
  desc: `你需要返回能表示矩阵的 四叉树 的根结点。`,
  solutions: [
    {
      script: Script.GO,
      time: 12,
      memory: 5.9,
      desc: '查看最大最小值',
      code: `func smallestRangeI(nums []int, k int) int {
  n := len(nums)
  if n == 1 {
    return 0
  }
  var (
    min = nums[0]
    max = nums[0]
  )
  for _, val := range nums {
    if min > val {
      min = val
    }
    if max < val {
      max = val
    }
  }
  mid := (min + max) >> 1
  if mid-min <= k {
    min = mid
  } else {
    min += k
  }
  if max-mid <= k {
    max = mid
  } else {
    max -= k
  }
  return max - min
}`,
    },
  ],
};
export default leetCodeMarkdown;
