import { ChevronsUpDown } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shadcn/ui/sidebar';
import { useAtom } from 'jotai';
import { activeSidebarCategoryAtom, sidebarCategories } from '@/utils';
import { Link } from 'react-router';

export function SidebarCategorySwitcher() {
    const { isMobile } = useSidebar();
    const [activeSidebarCategory, setActiveSidebarCategoryAtom] =
        useAtom(activeSidebarCategoryAtom);

    if (!activeSidebarCategory) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <activeSidebarCategory.logo className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeSidebarCategory.name}
                                </span>
                                <span className="truncate text-xs">
                                    {activeSidebarCategory.desc}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Menu
                        </DropdownMenuLabel>
                        {sidebarCategories.map((item) => (
                            <Link to={item.path as string} key={item.name}>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setActiveSidebarCategoryAtom(item);
                                    }}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-sm border">
                                        <item.logo className="size-4 shrink-0" />
                                    </div>
                                    {item.name}
                                    {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </Link>
                        ))}
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
