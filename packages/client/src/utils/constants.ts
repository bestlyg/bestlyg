import { RandomIcon } from '@/components/random-icon';
import {
    image2shadowRoute,
    point24Route,
    serverlessRoute,
    ledgerListRoute,
    xuanRoute,
    chineseChessRoute,
} from '@/routes';
import * as idl from '@bestlyg/common/idl/client';

declare const __MODE__: 'development' | 'production' | undefined;

export const MODE = typeof __MODE__ !== 'undefined' ? __MODE__ : 'development';
export const IS_DEV = MODE === 'development';
export const IS_PROD = MODE === 'production';

export const xTokenName = 'x-token';

export const paths = {
    docs: { path: '/docs' },
    leetcode: { path: '/leetcode' },
    application: {
        path: '/application',
        children: {
            image2shadow: { path: '/image2shadow' },
            point24: { path: '/point24' },
            serverless: { path: '/serverless' },
            chineseChess: { path: '/chinese-chess' },
        },
    },
    management: {
        path: '/management',
        children: {
            xuan: { path: '/xuan' },
            ledger: {
                path: '/ledger',
                children: {
                    list: '/list',
                },
            },
        },
    },
    welcome: { path: '/' },
    login: { path: '/login' },
    resume: { path: '/resume' },
} as const;

async function requestApplicationSidebars(): Promise<{
    groups?: idl.api.bestlyg.SidebarGroup[];
}> {
    return {
        groups: [
            {
                name: '应用合集',
                items: [
                    {
                        name: '图像转阴影',
                        link: image2shadowRoute.fullPath,
                    },
                    {
                        name: '24点',
                        link: point24Route.fullPath,
                    },
                    {
                        name: 'Serverless',
                        link: serverlessRoute.fullPath,
                    },
                    // {
                    //     name: '中国象棋',
                    //     link: chineseChessRoute.fullPath,
                    // },
                ],
            },
        ],
    };
}

async function requestManagementSidebars(): Promise<{
    groups?: idl.api.bestlyg.SidebarGroup[];
}> {
    return {
        groups: [
            {
                name: '管理合集',
                items: [
                    {
                        name: '账本',
                        link: ledgerListRoute.fullPath,
                    },
                    {
                        name: '瑄的',
                        link: xuanRoute.fullPath,
                    },
                ],
            },
        ],
    };
}

export const sidebarCategories: {
    name: string;
    logo: React.FC<any>;
    desc: string;
    path:
        | typeof paths.docs.path
        | typeof paths.leetcode.path
        | typeof paths.application.path
        | typeof paths.management.path;
    request:
        | typeof idl.api.bestlyg.ClientService.GetDocsSidebars.request
        | typeof idl.api.bestlyg.ClientService.GetLeetcodeSidebars.request
        | typeof requestApplicationSidebars
        | typeof requestManagementSidebars;
}[] = [
    {
        name: '文档',
        logo: RandomIcon,
        desc: '记录生活 记录自己',
        path: paths.docs.path,
        request: idl.api.bestlyg.ClientService.GetDocsSidebars.request,
    },
    {
        name: '力扣',
        logo: RandomIcon,
        desc: '天天力扣 好好记录',
        path: paths.leetcode.path,
        request: idl.api.bestlyg.ClientService.GetLeetcodeSidebars.request,
    },
    {
        name: '应用',
        logo: RandomIcon,
        desc: '脑洞大开 代码好玩',
        path: paths.application.path,
        request: requestApplicationSidebars,
    },
    {
        name: '管理',
        logo: RandomIcon,
        desc: '我的世界 独一无二',
        path: paths.management.path,
        request: requestManagementSidebars,
    },
] as const;
