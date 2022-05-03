import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '937. 重新排列日志文件',
  url: 'https://leetcode-cn.com/problems/tag-validator/',
  difficulty: Difficulty.困难,
  tag: [Tag.栈, Tag.字符串],
  desc: `给定一个表示代码片段的字符串，你需要实现一个验证器来解析这段代码，并返回它是否合法。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 4.6,
      desc: '分割字符串，排序',
      code: `type Item struct {
    raw   []string
    state int
    idx   int
}

func reorderLogFiles(logs []string) []string {
    n := len(logs)
    list := make([]Item, n)
    for i := 0; i < n; i++ {
        list[i] = toItem(logs[i], i)
    }
    sort.Slice(list, func(i, j int) bool {
        if list[i].state == 0 && list[j].state == 0 {
            return list[i].idx < list[j].idx
        } else if list[i].state == 0 && list[j].state == 1 {
            return false
        } else if list[i].state == 1 && list[j].state == 0 {
            return true
        } else {
            idx := 1
            for ; idx < len(list[i].raw) && idx < len(list[j].raw); idx++ {
                comp := strings.Compare(list[i].raw[idx], list[j].raw[idx])
                if comp < 0 {
                    return true
                } else if comp > 0 {
                    return false
                }
            }
            if idx != len(list[i].raw) {
                return false
            } else if idx != len(list[j].raw) {
                return true
            } else {
                return strings.Compare(list[i].raw[0], list[j].raw[0]) < 0
            }

        }
    })
    ans := make([]string, n)
    for i, val := range list {
        ans[i] = logs[val.idx]
    }
    return ans
}
func toItem(log string, i int) Item {
    item := Item{}
    item.idx = i
    item.raw = strings.Split(log, " ")
    var flag bool = true
    for _, val := range item.raw[1] {
        if !unicode.IsDigit(val) {
            flag = false
            break
        }
    }
    if flag {
        item.state = 0
    } else {
        item.state = 1
    }
    return item
}`,
    },
  ],
};
export default leetCodeMarkdown;
