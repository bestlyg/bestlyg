import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/shadcn/ui/sidebar';
import { activeSidebarItemAtom, sidebarPromiseAtom } from '@/utils';
import { Outlet } from '@tanstack/react-router';
import { useRouterState } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import * as idl from '@bestlyg/common/idl/client';
import React from 'react';
import { AppHeader } from '@/components/app-header';
import { loginRoute, resumeRoute } from '@/routes';
import { ScrollToTop } from './scroll-to-top';
import { ArrowUpToLine } from 'lucide-react';

export default function AppLayout() {
    const outletContainer = React.useRef<HTMLDivElement | null>(null);
    const { sidebarPromise } = useAtomValue(sidebarPromiseAtom);
    const setActiveSidebarItem = useSetAtom(activeSidebarItemAtom);
    const state = useRouterState();
    React.useEffect(() => {
        function findActiveItem(groups: idl.api.bestlyg.SidebarGroup[]): any {
            for (const group of groups) {
                for (const item of group.items ?? []) {
                    if (
                        item.link === state.resolvedLocation.search.p ||
                        state.resolvedLocation.pathname.startsWith(item.link)
                    ) {
                        return item;
                    }
                }
                const res = findActiveItem(group.groups ?? []);
                if (res) return res;
            }
        }
        sidebarPromise?.then(sidebar => {
            const activeItem = findActiveItem(sidebar?.groups ?? []);
            setActiveSidebarItem(activeItem);
        });
    }, [state, sidebarPromise]);
    if (
        state.resolvedLocation.pathname.startsWith(loginRoute.fullPath) ||
        state.resolvedLocation.pathname.startsWith(resumeRoute.fullPath)
    )
        return <Outlet />;
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="h-svh overflow-hidden">
                <AppHeader />
                <div
                    ref={outletContainer}
                    className="flex flex-1 flex-col gap-4 pt-0 px-[max(calc((100svw-960px)/2),20px)] pb-[20px] overflow-y-auto"
                >
                    <Outlet />
                </div>
                <ScrollToTop
                    minHeight={20}
                    scrollTo={10}
                    className="fixed right-8 bottom-4 rounded-full h-[32px] w-[32px]"
                    getContainer={() => outletContainer.current}
                >
                    <ArrowUpToLine />
                </ScrollToTop>
            </SidebarInset>
        </SidebarProvider>
    );
}
