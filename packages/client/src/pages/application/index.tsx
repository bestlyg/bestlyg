import { summaryNodeAtom } from '@/components/app-layout';
import { Outlet } from 'react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export default function Application() {
    const setSummaryNode = useSetAtom(summaryNodeAtom);
    useEffect(() => {
        setSummaryNode(null);
    }, []);
    return <Outlet />;
}
