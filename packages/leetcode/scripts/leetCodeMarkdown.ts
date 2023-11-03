import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '117. 填充每个节点的下一个右侧节点指针 II',
    url: 'https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL 。`,
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
        {
            script: Script.CPP,
            time: 8,
            memory: 16.93,
            desc: '层序遍历中同时记录next',
            code: `class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return root;
        Node *head = root, *p = head, *next_head = nullptr;
        while (p) {
            if (p->left) {
                if (!next_head) head = next_head = p->left;
                else next_head = next_head->next = p->left;
            }
            if (p->right) {
                if (!next_head) head = next_head = p->right;
                else next_head = next_head->next = p->right;
            }
            p = p->next;
            if (!p) p = head, head = next_head = nullptr;
        }
        return root;
    }
};`,
        },
        // {
        //     script: Script.PY,
        //     time: 40,
        //     memory: 15.66,
        //     desc: '层序遍历中同时记录next',
        //     code: ``,
        // },
        // {
        //     script: Script.RUST,
        //     time: 16,
        //     memory: 4.29,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
