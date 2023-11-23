import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1410. HTML 实体解析器',
    url: 'https://leetcode.cn/problems/html-entity-parser',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你输入字符串 text ，请你实现一个 HTML 实体解析器，返回解析器解析后的结果。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 68,
            memory: 16.32,
            desc: '字符串替换',
            code: `class Solution:
            def entityParser(self, text: str) -> str:
    return text.replace('&quot;', '\\"').replace('&apos;', '\\'').replace('&gt;', '>').replace('&lt;', '<').replace('&frasl;', '/').replace('&amp;', '&')`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
