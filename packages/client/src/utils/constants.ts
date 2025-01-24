import { RandomIcon } from '@/components/random-icon';
import * as idl from '@bestlyg/common/idl/client';
import z from 'zod';
export const xTokenName = 'x-token';
export const docsPath = '/docs';
export const leetcodePath = '/leetcode';
export const applicationPath = '/application';
export const managementPath = '/management';
export const xuanPath = '/xuan';
export const ledgerPath = '/ledger';
export const ledgerListPath = `${ledgerPath}/list`;

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
                        link: 'image2shadow',
                    },
                    {
                        name: '24点',
                        link: 'point24',
                    },
                    {
                        name: 'Serverless',
                        link: 'serverless',
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
                        link: `${managementPath}${ledgerListPath}`,
                    },
                    {
                        name: '瑄的',
                        link: `${managementPath}${xuanPath}`,
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
    path: typeof docsPath | typeof leetcodePath | typeof applicationPath | typeof managementPath;
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
        path: docsPath,
        request: idl.api.bestlyg.ClientService.GetDocsSidebars.request,
    },
    {
        name: '力扣',
        logo: RandomIcon,
        desc: '天天力扣 好好记录',
        path: leetcodePath,
        request: idl.api.bestlyg.ClientService.GetLeetcodeSidebars.request,
    },
    {
        name: '应用',
        logo: RandomIcon,
        desc: '脑洞大开 代码好玩',
        path: applicationPath,
        request: requestApplicationSidebars,
    },
    {
        name: '管理',
        logo: RandomIcon,
        desc: '我的世界 独一无二',
        path: managementPath,
        request: requestManagementSidebars,
    },
] as const;

export const sidebarValidateSearch = z.object({ p: z.string().optional() });
