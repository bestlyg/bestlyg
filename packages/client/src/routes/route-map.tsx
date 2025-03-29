import { Skeleton as SkeletonUI } from '@/shadcn/ui/skeleton';
import { cachedDynamicImportComponent } from '@bestlyg/common/client';

function Skeleton() {
    const item = (
        <div className="flex flex-col space-y-3 px-[20px] py-[10px]">
            <div className="space-y-2">
                <SkeletonUI className="h-3 w-full" />
                <SkeletonUI className="h-3 w-full" />
                <SkeletonUI className="h-3 w-[80%]" />
                <SkeletonUI className="h-3 w-[80%]" />
            </div>
        </div>
    );
    return (
        <div className="mt-[40px]">
            {item}
            {item}
            {item}
        </div>
    );
}

function load(loadFn: Parameters<typeof cachedDynamicImportComponent>[0]) {
    return cachedDynamicImportComponent(loadFn, <Skeleton />);
}

const AppLayout = load(() => import('@/components/app-layout'));
const Welcome = load(() => import('@/pages/welcome'));
const Login = load(() => import('@/pages/login'));
const Resume = load(() => import('@/pages/resume/resume'));
const Docs = load(() => import('@/pages/docs'));
const Leetcode = load(() => import('@/pages/leetcode'));
const Application = load(() => import('@/pages/application'));
const Image2shadow = load(() => import('@/pages/application/image2shadow'));
const Point24 = load(() => import('@/pages/application/point24'));
const Serverless = load(() => import('@/pages/application/serverless'));
const ChineseChess = load(() => import('@/pages/application/chinese-chess'));
const Sse = load(() => import('@/pages/application/sse'));
const Management = load(() => import('@/pages/management'));
const Xuan = load(() => import('@/pages/management/xuan'));
const Ledger = load(() => import('@/pages/management/ledger'));
const LedgerList = load(() => import('@/pages/management/ledger/list'));

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
