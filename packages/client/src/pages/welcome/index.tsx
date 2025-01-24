import { docsRoute } from '@/routes';
import { Navigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { activeSidebarCategoryAtom, sidebarCategories } from '@/utils';

export function Welcome() {
    const setActiveSidebarCategoryAtom = useSetAtom(activeSidebarCategoryAtom);
    useEffect(() => {
        setActiveSidebarCategoryAtom(sidebarCategories[0]);
    }, []);
    return <Navigate to={docsRoute.fullPath} />;
}
