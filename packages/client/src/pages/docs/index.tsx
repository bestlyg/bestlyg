import { useEffect } from 'react';
import { request } from '@bestlyg/common/idl/utils';
import React from 'react';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { Suspense } from '@/components/suspense';
import { Markdown } from '@/components/markdown';
import { useParams,  } from 'react-router';
import { useSetAtom } from 'jotai';
import { summaryNodeAtom } from '@/components/app-summary';
import { MarkdownSummary } from '@/components/markdown-summary';
import { apiMap } from '@bestlyg/common';

async function fetchReadableStaticFile(
    p?: string | null,
): Promise<string | null> {
    if (!p) return null;
    const data = await request({
        url: apiMap.StaticController.getStaticFile.path,
        method: apiMap.StaticController.getStaticFile.method,
        data: { p: `docs/${p}`, r: 'true' },
        serializer: 'json',
    });
    return data;
}

function Doc({ promise }: { promise: ReturnType<typeof fetchReadableStaticFile> }) {
    const md = React.use(promise);
    if (!md) null;
    return <Markdown md={md ?? ''} />;
}

function DocsSkeleton() {
    const item = (
        <div className="flex flex-col space-y-3 px-[20px] py-[10px]">
            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[80%]" />
                <Skeleton className="h-3 w-[80%]" />
            </div>
        </div>
    );
    return (
        <div className="mt-[40px]">
            {item}
            {item}
            {item}
        </div>
    );
}

export default function Docs() {
    const setSummaryNode = useSetAtom(summaryNodeAtom);
    const params = useParams();
    const link = params['*'];
    const acRef = React.useRef<AbortController | null>(null);
    const [promise, setPromise] = React.useState(() => fetchReadableStaticFile(link));
    useEffect(() => {
        if (link === '*') {
        } else {
            acRef.current = new AbortController();
            setPromise(() => fetchReadableStaticFile(link));
            setSummaryNode(<MarkdownSummary />);
        }
    }, [link]);
    if (!link) return <DocsSkeleton />;
    return <Suspense fallback={<DocsSkeleton />} promise={promise} Component={Doc} />;
}
