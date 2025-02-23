import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/shadcn/ui/sidebar';
import {
    sidebarPromiseAtom,
    sidebarCategories,
    activeSidebarCategoryAtom,
    activeSidebarBreadcrumbListAtom,
    IS_DEV,
} from '@/utils';
import { Outlet, useRouterState } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import * as idl from '@bestlyg/common/idl/client';
import React from 'react';
import { AppHeader } from '@/components/app-header';
import { loginRoute, resumeRoute, rootRoute } from '@/routes';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ScrollToTop } from '@/components/scroll-to-top';
import { ArrowUpToLine } from 'lucide-react';
import { AppSummary } from '@/components/app-summary';

export default function AppLayout() {
    const state = useRouterState();
    const { sidebarPromise } = useAtomValue(sidebarPromiseAtom);
    const setActiveSidebarBreadcrumbList = useSetAtom(activeSidebarBreadcrumbListAtom);
    const setActiveSidebarCategory = useSetAtom(activeSidebarCategoryAtom);
    React.useEffect(() => {
        const matchInfo = state.matches.filter(v => v.id !== rootRoute.id)[0];
        // console.log('RouterState', state);
        setActiveSidebarCategory(
            sidebarCategories.find(v => matchInfo?.fullPath.startsWith(v.path)) ?? null,
        );
        function findActiveItem(
            groups: idl.api.bestlyg.SidebarGroup[],
        ): (idl.api.bestlyg.SidebarItem | idl.api.bestlyg.SidebarGroup)[] | null {
            for (const group of groups) {
                for (const item of group.items ?? []) {
                    if (state.resolvedLocation?.pathname === item.link) {
                        return [group, item];
                    }
                }
                const res = findActiveItem(group.groups ?? []);
                if (res) return [group].concat(res);
            }
            return null;
        }
        sidebarPromise?.then(sidebar => {
            const res = findActiveItem(sidebar?.groups ?? []);
            setActiveSidebarBreadcrumbList(res);
        });
    }, [state, sidebarPromise]);
    if (
        state.resolvedLocation?.pathname.startsWith(loginRoute.fullPath) ||
        state.resolvedLocation?.pathname.startsWith(resumeRoute.fullPath)
    )
        return <Outlet />;
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <main className="relative py-4 lg:gap-10 xl:grid xl:grid-cols-[1fr_300px] px-[max(calc((100svw-1280px)/2),20px)]">
                    <div className="flex flex-1 flex-col gap-4 pt-0">
                        <div>
                            <Outlet />
                        </div>
                    </div>
                    <AppSummary />
                </main>
                <ScrollToTop
                    minHeight={20}
                    scrollTo={0}
                    className="fixed right-8 bottom-4 rounded-full h-[32px] w-[32px]"
                >
                    <ArrowUpToLine />
                </ScrollToTop>
            </SidebarInset>
            {IS_DEV && <TanStackRouterDevtools />}
        </SidebarProvider>
    );
}
