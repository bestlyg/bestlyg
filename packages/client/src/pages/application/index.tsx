import { summaryNodeAtom } from '@/components/app-summary';
import { Image2Shadow } from '@/components/applications/image2shadow';
import { Point24 } from '@/components/applications/point24';
import { Serverless } from '@/components/applications/serverless';
import { applicationRoute } from '@/routes';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function Application() {
    const search = applicationRoute.useSearch();
    const setSummaryNodeAtom = useSetAtom(summaryNodeAtom);
    useEffect(() => {
        setSummaryNodeAtom(null);
    }, []);
    switch (search.p) {
        case 'image2shadow':
            return <Image2Shadow />;
        case 'point24':
            return <Point24 />;
        case 'serverless':
            return <Serverless />;
    }
    return <>SHOW SOME APPLICATION</>;
}
