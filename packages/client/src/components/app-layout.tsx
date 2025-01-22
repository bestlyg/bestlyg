import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shadcn/ui/sidebar";
import { activeSidebarItemAtom, sidebarPromiseAtom } from "@/utils";
import { Outlet } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import * as idl from "@bestlyg/common/idl/client";
import React from "react";
import { AppHeader } from "@/components/app-header";
import { loginRoute, resumeRoute } from "@/routes";

export default function AppLayout() {
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
    sidebarPromise?.then((sidebar) => {
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
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 pt-0 w-[min(1080px,100%-40px)] mx-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
