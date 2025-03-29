import { cachedDynamicImportComponent } from '@bestlyg/common/client';

const AppLayout = cachedDynamicImportComponent(() => import('@/components/app-layout'));
const Welcome = cachedDynamicImportComponent(() => import('@/pages/welcome'));
const Login = cachedDynamicImportComponent(() => import('@/pages/login'));
const Resume = cachedDynamicImportComponent(() => import('@/pages/resume/resume'));
const Docs = cachedDynamicImportComponent(() => import('@/pages/docs'));
const Leetcode = cachedDynamicImportComponent(() => import('@/pages/leetcode'));
const Application = cachedDynamicImportComponent(() => import('@/pages/application'));
const Image2shadow = cachedDynamicImportComponent(() => import('@/pages/application/image2shadow'));
const Point24 = cachedDynamicImportComponent(() => import('@/pages/application/point24'));
const Serverless = cachedDynamicImportComponent(() => import('@/pages/application/serverless'));
const ChineseChess = cachedDynamicImportComponent(() => import('@/pages/application/chinese-chess'));
const Sse = cachedDynamicImportComponent(() => import('@/pages/application/sse'));
const Management = cachedDynamicImportComponent(() => import('@/pages/management'));
const Xuan = cachedDynamicImportComponent(() => import('@/pages/management/xuan'));
const Ledger = cachedDynamicImportComponent(() => import('@/pages/management/ledger'));
const LedgerList = cachedDynamicImportComponent(() => import('@/pages/management/ledger/list'));

export const routeMap = {
    path: '/',
    welcome: { path: '/', element: <Welcome /> },
    login: { path: 'login', element: <Login /> },
    resume: { path: 'resume', element: <Resume /> },
    common: {
        path: '/',
        element: <AppLayout />,
        docs: { path: 'docs/*', element: <Docs /> },
        leetcode: { path: 'leetcode/*', element: <Leetcode /> },
        application: {
            path: 'application',
            element: <Application />,
            image2shadow: { path: 'image2shadow', element: <Image2shadow /> },
            point24: { path: 'point24', element: <Point24 /> },
            serverless: { path: 'serverless', element: <Serverless /> },
            chineseChess: { path: 'chinese-chess', element: <ChineseChess /> },
            sse: { path: 'sse', element: <Sse /> },
        },
        management: {
            path: 'management',
            element: <Management />,
            xuan: { path: 'xuan', element: <Xuan /> },
            ledger: {
                path: 'ledger',
                element: <Ledger />,
                list: { path: 'list', element: <LedgerList /> },
            },
        },
    },
} as const;
