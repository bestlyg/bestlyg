import { RandomIcon } from '@/components/random-icon';
import { routeMap } from '@/routes';
import * as idl from '@bestlyg/common/idl/client';

declare const __MODE__: 'development' | 'production' | undefined;

export const MODE = typeof __MODE__ !== 'undefined' ? __MODE__ : 'development';
export const IS_DEV = MODE === 'development';
export const IS_PROD = MODE === 'production';

export const xTokenName = 'x-token';

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
                        link: routeMap.common.application.image2shadow.path,
                    },
                    {
                        name: '24点',
                        link: routeMap.common.application.point24.path,
                    },
                    {
                        name: 'Serverless',
                        link: routeMap.common.application.serverless.path,
                    },
                    {
                        name: '中国象棋',
                        link: routeMap.common.application.chineseChess.path,
                    },
                    {
                        name: 'Server Side Event',
                        link: routeMap.common.application.sse.path,
                    },
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
                        link: routeMap.common.management.ledger.list.path,
                    },
                    {
                        name: '瑄的',
                        link: routeMap.common.management.xuan.path,
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
    path: string;
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
        path: '/docs',
        request: idl.api.bestlyg.ClientService.GetDocsSidebars.request,
    },
    {
        name: '力扣',
        logo: RandomIcon,
        desc: '天天力扣 好好记录',
        path: '/leetcode',
        request: idl.api.bestlyg.ClientService.GetLeetcodeSidebars.request,
    },
    {
        name: '应用',
        logo: RandomIcon,
        desc: '脑洞大开 代码好玩',
        path: '/application',
        request: requestApplicationSidebars,
    },
    {
        name: '管理',
        logo: RandomIcon,
        desc: '我的世界 独一无二',
        path: '/management',
        request: requestManagementSidebars,
    },
] as const;
