import React from 'react';
import * as idl from '@bestlyg/common/idl/client';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shadcn/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from '@/shadcn/ui/sidebar';
import { Skeleton } from '@/shadcn/ui/skeleton';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/shadcn/ui/sidebar';
import { RandomIcon } from '@/components/random-icon';
import _ from 'lodash';
import { SidebarCategorySwitcher } from './sidebar-category-switcher';
import { useAtomValue } from 'jotai';
import {
    activeSidebarBreadcrumbListAtom,
    activeSidebarCategoryAtom,
    sidebarPromiseAtom,
} from '@/utils';
import { Suspense } from '@/components/suspense';
import { AppSidebarFooter } from './app-sidebar-footer';

function SidebarContentSkeleton() {
    const item = (
        <div className="flex flex-col space-y-3 px-[20px] py-[10px]">
            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[80%]" />
                <Skeleton className="h-3 w-[80%]" />
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

function NavSidebarGroup({ data }: { data: idl.api.bestlyg.SidebarGroup }) {
    const activeSidebarCategory = useAtomValue(activeSidebarCategoryAtom);
    const activeSidebarBreadcrumbList = useAtomValue(activeSidebarBreadcrumbListAtom);
    const sidebarCtx = useSidebar();
    if (!activeSidebarCategory) return null;
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{data.name}</SidebarGroupLabel>
            <SidebarMenu>
                {data.items?.map((item, i) => {
                    return (
                        <SidebarMenuButton
                            tooltip={item.name}
                            asChild
                            key={i}
                            isActive={activeSidebarBreadcrumbList?.includes(item)}
                        >
                            <Link
                                onClick={() => {
                                    sidebarCtx.setOpenMobile(false);
                                }}
                                to={item.link}
                            >
                                <RandomIcon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    );
                })}
                {data.groups?.map((item, i) => {
                    return (
                        <Collapsible
                            key={i}
                            asChild
                            className="group/collapsible"
                            // open={activeSidebarBreadcrumbList?.includes(item) ? true : undefined}
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.name}>
                                        <RandomIcon />
                                        <span>{item.name}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map(subItem => {
                                            return (
                                                <SidebarMenuSubItem key={subItem.name}>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={activeSidebarBreadcrumbList?.includes(
                                                            subItem,
                                                        )}
                                                    >
                                                        <Link
                                                            onClick={() => {
                                                                sidebarCtx.setOpenMobile(false);
                                                            }}
                                                            to={subItem.link}
                                                        >
                                                            <RandomIcon />
                                                            <span>{subItem.name}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function Nav({ promise: sidebarPromise }: { promise: Promise<idl.api.bestlyg.SidebarsResponse | null | undefined> }) {
    const sidebar = React.use(sidebarPromise);
    return sidebar?.groups
        ?.filter(v => v.groups?.length || v.items?.length)
        .map((v, i) => <NavSidebarGroup key={i} data={v} />);
}

export function AppSidebar() {
    const { sidebarPromise } = useAtomValue(sidebarPromiseAtom);
    return (
        <Sidebar collapsible="icon" className='!sticky'>
            <SidebarHeader>
                <SidebarCategorySwitcher />
            </SidebarHeader>
            <SidebarContent>
                <Suspense
                    promise={sidebarPromise}
                    fallback={<SidebarContentSkeleton />}
                    Component={Nav}
                />
            </SidebarContent>
            <SidebarFooter>
                <AppSidebarFooter />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
