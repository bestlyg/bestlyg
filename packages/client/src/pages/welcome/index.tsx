import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { activeSidebarCategoryAtom, sidebarCategories } from '@/utils';
import { Navigate } from 'react-router';
import { routeMap } from '@/routes';

export default function Welcome() {
    const setActiveSidebarCategoryAtom = useSetAtom(activeSidebarCategoryAtom);
    useEffect(() => {
        setActiveSidebarCategoryAtom(sidebarCategories[0]);
    }, []);
    return (
        <Navigate
            to={routeMap.common.docs.path.substring(0, routeMap.common.docs.path.length - 2)}
        />
    );
}
