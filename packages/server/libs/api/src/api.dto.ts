export class SidebarItem {
    name: string;
    link: string;
}

export class SidebarGroup {
    name: string;
    items?: SidebarItem[];
    groups?: SidebarGroup[];
}

export class Sidebar {
    groups?: SidebarGroup[];
}
