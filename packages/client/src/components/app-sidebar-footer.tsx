'use client';

import { ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shadcn/ui/sidebar';
import { useAtomValue } from 'jotai';
import { userInfoAtom, UserInfo } from '@/utils';
import { RandomIcon } from '@/components/random-icon';
import { Link } from '@tanstack/react-router';
import { loginRoute, resumeRoute } from '@/routes';

const customerInfo: UserInfo = {
    nickname: 'Guest',
    description: "A guest's role is limited.",
    avatar: '/static?p=logo.png&r=false',
};

export function AppSidebarFooter() {
    const { isMobile } = useSidebar();
    const userInfo = useAtomValue(userInfoAtom);
    const user = userInfo ?? customerInfo;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.nickname} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.nickname}</span>
                                <span className="truncate text-xs">{user.description}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.nickname} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.nickname}</span>
                                    <span className="truncate text-xs">{user.description}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link to={resumeRoute.fullPath}>
                                <DropdownMenuItem>
                                    <RandomIcon />
                                    About Bestlyg
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        {userInfo ? (
                            <DropdownMenuItem
                                onClick={() => {
                                    localStorage.clear();
                                    location.reload();
                                }}
                            >
                                <RandomIcon />
                                Log out
                            </DropdownMenuItem>
                        ) : (
                            <Link to={loginRoute.fullPath}>
                                <DropdownMenuItem>
                                    <RandomIcon />
                                    Log in
                                </DropdownMenuItem>
                            </Link>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
