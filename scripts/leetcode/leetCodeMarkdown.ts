import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '468. 验证IP地址',
  url: 'https://leetcode.cn/problems/find-closest-lcci/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.字符串],
  desc: `有个内含单词的超大文本文件，给定任意两个不同的单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。`,
  solutions: [
    {
      script: Script.TS,
      time: 64,
      memory: 42.5,
      desc: '遍历，检测',
      code: `const ipv4Reg = /^[0-9]+$/;
      function _checkIPV4(item: string): boolean {
        if (!ipv4Reg.test(item)) return false;
        if (item.length > 1 && item[0] === '0') return false;
        if (parseInt(item) > 255) return false;
        return true;
      }
      function checkIPV4(str: string): boolean {
        const items = str.split('.');
        if (items.length !== 4) return false;
        return items.every(_checkIPV4);
      }
      const ipv6Reg = /^[0-9a-fA-F]*$/;
      function _checkIPV6(item: string): boolean {
        if (!ipv6Reg.test(item)) return false;
        if (item.length > 4 || item.length === 0) return false;
        return true;
      }
      function checkIPV6(str: string): boolean {
        const items = str.split(':');
        if (items.length !== 8) return false;
        return items.every(_checkIPV6);
      }
      function validIPAddress(queryIP: string): string {
        if (checkIPV4(queryIP)) return 'IPv4';
        if (checkIPV6(queryIP)) return 'IPv6';
        return 'Neither';
      }`,
    },
  ],
};
export default leetCodeMarkdown;
