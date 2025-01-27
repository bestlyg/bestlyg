import { Docs } from '@/pages/docs';
import { Leetcode } from '@/pages/leetcode';
import AppLayout from '@/components/app-layout';
import {
    RouterProvider as TanstackRouterProvider,
    createRouter,
    createRoute,
    createRootRoute,
    Outlet,
} from '@tanstack/react-router';
import { paths } from '@/utils';
import { Application } from '@/pages/application';
import { Image2Shadow } from '@/pages/application/image2shadow';
import { Point24 } from '@/pages/application/point24';
import { Serverless } from '@/pages/application/serverless';
import { Management } from '@/pages/management';
import { LedgerList } from '@/pages/management/ledger/list';
import { Xuan } from '@/pages/management/xuan';
import { Welcome } from '@/pages/welcome';
import { Login } from '@/pages/login';
import { Resume } from '@/pages/resume';

export const rootRoute = createRootRoute({
    component: AppLayout,
});

export const welcomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.welcome.path,
    component: Welcome,
});

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.login.path,
    component: Login,
});

export const resumeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.resume.path,
    component: Resume,
});

export const docsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `${paths.docs.path}/*`,
    component: Docs,
});

export const leetcodeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `${paths.leetcode.path}/*`,
    component: Leetcode,
});

export const applicationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.application.path,
    component: Application,
});

export const image2shadowRoute = createRoute({
    getParentRoute: () => applicationRoute,
    path: paths.application.children.image2shadow.path,
    component: Image2Shadow,
});
export const point24Route = createRoute({
    getParentRoute: () => applicationRoute,
    path: paths.application.children.point24.path,
    component: Point24,
});
export const serverlessRoute = createRoute({
    getParentRoute: () => applicationRoute,
    path: paths.application.children.serverless.path,
    component: Serverless,
});

const applicationRouteTree = applicationRoute.addChildren([
    image2shadowRoute,
    point24Route,
    serverlessRoute,
]);

export const managementRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.management.path,
    component: Management,
});

export const ledgerRoute = createRoute({
    getParentRoute: () => managementRoute,
    path: paths.management.children.ledger.path,
    component: Outlet,
});

export const ledgerListRoute = createRoute({
    getParentRoute: () => ledgerRoute,
    path: paths.management.children.ledger.children.list,
    component: LedgerList,
});

const ledgerRouteTree = ledgerRoute.addChildren([ledgerListRoute]);

export const xuanRoute = createRoute({
    getParentRoute: () => managementRoute,
    path: paths.management.children.xuan.path,
    component: Xuan,
});

const managementRouteTree = managementRoute.addChildren([ledgerRouteTree, xuanRoute]);

const rootRouteTree = rootRoute.addChildren([
    welcomeRoute,
    docsRoute,
    leetcodeRoute,
    applicationRouteTree,
    managementRouteTree,
    loginRoute,
    resumeRoute,
]);

export const router = createRouter({
    routeTree: rootRouteTree,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export function RouterProvider() {
    return <TanstackRouterProvider router={router} />;
}
