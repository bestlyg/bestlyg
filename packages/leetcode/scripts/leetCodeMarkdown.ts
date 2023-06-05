import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2705. 精简对象',
    url: 'https://leetcode.cn/problems/compact-object/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `现给定一个对象或数组 obj，返回一个 精简对象 。精简对象 与原始对象相同，只是将包含 假 值的键移除。该操作适用于对象及其嵌套对象。数组被视为索引作为键的对象。当 Boolean(value) 返回 false 时，值被视为 假 值。`,
    solutions: [
        {
            script: Script.TS,
            time: 156,
            memory: 69,
            desc: '对于每个是对象的value，进行dfs',
            code: `type Obj = Record<any, any>;

function compactObject(obj: Obj): Obj {
    const res: any = Array.isArray(obj) ? [] : {};
    for (const [k, v] of Object.entries(obj)) {
        if (Boolean(v)) {
            const newv = typeof v === 'object' ? compactObject(v) : v;
            if (Array.isArray(obj)) res.push(newv);
            else res[k] = newv;
        }
    }
    return res;
};`,
        },
        // {
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 7.9,
        //     desc: '按字符统计数据',
        //     code: ``,
        // },
        // {
        //     script: Script.PY3,
        //     time: 100,
        //     memory: 18.1,
        //     desc: '同上',
        //     code: ``,
        // },
        //         {
        //             script: Script.RUST,
        //             time: 0,
        //             memory: 2.3,
        //             desc: '同上',
        //             code: ``,
        //         },
    ],
};

export default leetCodeMarkdown;
