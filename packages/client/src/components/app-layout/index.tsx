import { AppSidebar } from './app-sidebar';
import { SidebarInset, SidebarProvider } from '@/shadcn/ui/sidebar';
import {
    sidebarPromiseAtom,
    sidebarCategories,
    activeSidebarCategoryAtom,
    activeSidebarBreadcrumbListAtom,
} from '@/utils';
import { Outlet, useLocation } from 'react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { AppHeader } from './app-header';
// import { loginRoute, resumeRoute, rootRoute } from '@/routes';
import { ScrollToTop } from '@/components/scroll-to-top';
import { ArrowUpToLine } from 'lucide-react';
import { AppSummary } from './app-summary';
import { AppFooter } from './app-footer';
import { SidebarGroup, SidebarItem } from '@bestlyg/server/type/index.ts';

export * from './app-header';
export * from './app-sidebar';
export * from './app-sidebar-footer';
export * from './app-summary';
export * from './app-footer';

export default function AppLayout() {
    const location = useLocation();
    const { sidebarPromise } = useAtomValue(sidebarPromiseAtom);
    const setActiveSidebarBreadcrumbList = useSetAtom(activeSidebarBreadcrumbListAtom);
    const setActiveSidebarCategory = useSetAtom(activeSidebarCategoryAtom);
    React.useEffect(() => {
        setActiveSidebarCategory(
            sidebarCategories.find(v => location.pathname.startsWith(v.path)) ?? null,
        );
        function findActiveItem(groups: SidebarGroup[]): (SidebarItem | SidebarGroup)[] | null {
            for (const group of groups) {
                for (const item of group.items ?? []) {
                    if (location.pathname === item.link) {
                        return [group, item];
                    }
                }
                const res = findActiveItem((group.groups ?? []) as SidebarGroup[]);
                if (res) return [group].concat(res);
            }
            return null;
        }
        sidebarPromise?.then(sidebar => {
            const res = findActiveItem(sidebar?.groups ?? []);
            setActiveSidebarBreadcrumbList(res);
        });
    }, [location, sidebarPromise]);
    return (
        <>
            {/* <div>123</div> */}
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
            </SidebarProvider>
            <AppFooter />
        </>
    );
}
