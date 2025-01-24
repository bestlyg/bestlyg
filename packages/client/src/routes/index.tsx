import { Docs } from '@/pages/docs';
import { Leetcode } from '@/pages/leetcode';
import AppLayout from '@/components/app-layout';
import {
    RouterProvider as TanstackRouterProvider,
    createRouter,
    createRoute,
    createRootRoute,
} from '@tanstack/react-router';
import {
    docsPath,
    leetcodePath,
    applicationPath,
    managementPath,
    sidebarValidateSearch,
    ledgerListPath,
    xuanPath,
} from '@/utils';
import { Application } from '@/pages/application';
import { Management } from '@/pages/management';
import { LedgerList } from '@/pages/ledger/list';
import { Welcome } from '@/pages/welcome';
import { Xuan } from '@/pages/xuan';
import { Login } from '@/pages/login';
import { Resume } from '@/pages/resume';

export const rootRoute = createRootRoute({
    component: AppLayout,
});

export const welcomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Welcome,
});

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
});

export const resumeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/resume',
    component: Resume,
});

export const docsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: docsPath,
    component: Docs,
    validateSearch: sidebarValidateSearch,
});

export const leetcodeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: leetcodePath,
    component: Leetcode,
    validateSearch: sidebarValidateSearch,
});

export const applicationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: applicationPath,
    component: Application,
    validateSearch: sidebarValidateSearch,
});

export const managementRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: managementPath,
    component: Management,
    validateSearch: sidebarValidateSearch,
});

export const ledgerListRoute = createRoute({
    getParentRoute: () => managementRoute,
    path: ledgerListPath,
    component: LedgerList,
});

export const weightsRoute = createRoute({
    getParentRoute: () => managementRoute,
    path: xuanPath,
    component: Xuan,
});

const managementRouteTree = managementRoute.addChildren([ledgerListRoute, weightsRoute]);

const rootRouteTree = rootRoute.addChildren([
    welcomeRoute,
    docsRoute,
    leetcodeRoute,
    applicationRoute,
    managementRouteTree,
    loginRoute,
    resumeRoute,
]);

const router = createRouter({
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
