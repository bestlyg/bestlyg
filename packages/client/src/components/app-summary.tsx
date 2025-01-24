import { atom, useAtomValue } from 'jotai';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Spin } from 'antd';

export const summaryNodeAtom = atom<React.ReactNode>();
export const summaryLoadingAtom = atom(false);

export function AppSummary() {
    const node = useAtomValue(summaryNodeAtom);
    const loading = useAtomValue(summaryLoadingAtom)
    return (
        <Spin spinning={loading} indicator={<LoadingSpinner />}>
            <div className="hidden text-sm xl:block">
                <div className="fixed top-20 h-[calc(100vh-3.5rem-64px)] pt-4 overflow-auto w-[300px]">{node}</div>
            </div>
        </Spin>
    );
}
