import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1592. 重新排列单词间的空格',
  url: 'https://leetcode.cn/problems/rearrange-spaces-between-words/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `返回 重新排列空格后的字符串 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.4,
      desc: '重组',
      code: `char * reorderSpaces(char * text){
    int len = strlen(text), list_len = 0, blank_cnt = 0;
    char *list[100] = {0}, *ans = (char *)calloc(len + 1, sizeof(char));
    for (int i = 0; i < len; i++) {
        if (text[i] == ' ') blank_cnt++;
        else {
            list[list_len++] = text + i;
            while (i + 1< len && text[i + 1] != ' ') i++;
        }
    }
    int blank_common_cnt = list_len > 1 ? blank_cnt / (list_len - 1) : 0, 
        blank_last_cnt   = list_len > 1 ? blank_cnt % (list_len - 1) : blank_cnt,
        ans_len = 0;
    for (int i = 0; i < list_len; i++) {
        for (char *j = list[i]; *j != ' ' && *j != '\0'; j++) ans[ans_len++] = *j;
        if (i == list_len - 1) for (int i = 0; i < blank_last_cnt; i++) ans[ans_len++] = ' ';
        else for (int i = 0; i < blank_common_cnt; i++) ans[ans_len++] = ' ';
    }
    return ans;
}`,
    },
  ],
};
export default leetCodeMarkdown;
