import AppLayout from '@/components/app-layout';
import {
    RouterProvider as TanstackRouterProvider,
    createRouter,
    createRoute,
    createRootRoute,
    lazyRouteComponent,
} from '@tanstack/react-router';
import { paths } from '@/utils';

export const rootRoute = createRootRoute({
    component: AppLayout,
});

export const welcomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.welcome.path,
    component: lazyRouteComponent(() => import('@/pages/welcome')),
});

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.login.path,
    component: lazyRouteComponent(() => import('@/pages/login')),
});

export const resumeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.resume.path,
    component: lazyRouteComponent(() => import('@/pages/resume')),
});

export const docsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `${paths.docs.path}/*`,
    component: lazyRouteComponent(() => import('@/pages/docs')),
});

export const leetcodeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `${paths.leetcode.path}/*`,
    component: lazyRouteComponent(() => import('@/pages/leetcode')),
});

export const applicationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.application.path,
    component: lazyRouteComponent(() => import('@/pages/application')),
});

export const image2shadowRoute = createRoute({
    getParentRoute: () => applicationRoute,
    path: paths.application.children.image2shadow.path,
    component: lazyRouteComponent(() => import('@/pages/application/image2shadow')),
});
export const point24Route = createRoute({
    getParentRoute: () => applicationRoute,
    path: paths.application.children.point24.path,
    component: lazyRouteComponent(() => import('@/pages/application/point24')),
});
export const serverlessRoute = createRoute({
    getParentRoute: () => applicationRoute,
    path: paths.application.children.serverless.path,
    component: lazyRouteComponent(() => import('@/pages/application/serverless')),
});

const applicationRouteTree = applicationRoute.addChildren([
    image2shadowRoute,
    point24Route,
    serverlessRoute,
]);

export const managementRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: paths.management.path,
    component: lazyRouteComponent(() => import('@/pages/management')),
});

export const ledgerRoute = createRoute({
    getParentRoute: () => managementRoute,
    path: paths.management.children.ledger.path,
    component: lazyRouteComponent(() => import('@/pages/management/ledger')),
});

export const ledgerListRoute = createRoute({
    getParentRoute: () => ledgerRoute,
    path: paths.management.children.ledger.children.list,
    component: lazyRouteComponent(() => import('@/pages/management/ledger/list')),
});

const ledgerRouteTree = ledgerRoute.addChildren([ledgerListRoute]);

export const xuanRoute = createRoute({
    getParentRoute: () => managementRoute,
    path: paths.management.children.xuan.path,
    component: lazyRouteComponent(() => import('@/pages/management/xuan')),
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
