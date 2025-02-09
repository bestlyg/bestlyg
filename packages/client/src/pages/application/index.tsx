import { summaryNodeAtom } from '@/components/app-summary';
import { Outlet } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export default function Application() {
    const setSummaryNode = useSetAtom(summaryNodeAtom);
    useEffect(() => {
        setSummaryNode(null);
    }, []);
    return <Outlet />;
}
