import {
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
    Breadcrumb,
    BreadcrumbItem,
} from '@/shadcn/ui/breadcrumb';
import { SidebarTrigger } from '@/shadcn/ui/sidebar';
import { Separator } from '@/shadcn/ui/separator';
import { activeSidebarCategoryAtom, activeSidebarItemAtom } from '@/utils';
import { useAtomValue } from 'jotai';
import { Link } from '@tanstack/react-router';

export function AppHeader() {
    const activeSidebarCategory = useAtomValue(activeSidebarCategoryAtom);
    const activeSidebarItem = useAtomValue(activeSidebarItemAtom);

    return (
        <header className="w-full z-[1] sticky top-0 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-grid border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    {activeSidebarCategory && (
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <Link to={activeSidebarCategory.path}>
                                    {activeSidebarCategory.name}
                                </Link>
                            </BreadcrumbItem>
                            {activeSidebarItem && (
                                <>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{activeSidebarItem.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    )}
                </Breadcrumb>
            </div>
        </header>
    );
}
