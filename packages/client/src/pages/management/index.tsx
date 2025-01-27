import { summaryNodeAtom } from '@/components/app-summary';
import { Outlet } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function Management() {
    const setSummaryNodeAtom = useSetAtom(summaryNodeAtom);
    useEffect(() => {
        setSummaryNodeAtom(null);
    }, []);
    return <Outlet />;
}
