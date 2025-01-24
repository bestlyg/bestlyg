import { summaryNodeAtom } from '@/components/app-summary';
import { managementRoute, ledgerListRoute, weightsRoute } from '@/routes';
import { Outlet, Navigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function Management() {
    const search = managementRoute.useSearch();
    const setSummaryNodeAtom = useSetAtom(summaryNodeAtom);
    useEffect(() => {
        setSummaryNodeAtom(null);
    }, []);
    switch (search.p) {
        case ledgerListRoute.fullPath:
            return <Navigate to={ledgerListRoute.fullPath} />;
        case weightsRoute.fullPath:
            return <Navigate to={weightsRoute.fullPath} />;
    }
    return <Outlet />;
}
