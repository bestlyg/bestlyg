import { useEffect } from 'react';
import { LeetcodeSolution, Prisma } from '@bestlyg/common/prisma-client';
import { request } from '@bestlyg/common/idl/utils';
import React from 'react';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { Suspense } from '@/components/suspense';
import dayjs from 'dayjs';
import { Markdown } from '@/components/markdown';
import { useSetAtom } from 'jotai';
import { summaryNodeAtom } from '@/components/app-layout';
import { MarkdownSummary } from '@/components/markdown-summary';
import { apiMap } from '@bestlyg/common';
import { useParams } from 'react-router';

const quote = '`';

function solutionToTemplate(solution: LeetcodeSolution, idx: number) {
    const { script, date, time, memory, code, desc } = solution;
    return `
## 题解 ${idx + 1} - ${script}

- 编辑时间：${dayjs(date).format('YYYY-MM-DD')}  
${time ? `- 执行用时：${time}ms  ` : ''}
${memory ? `- 内存消耗：${memory}MB  ` : ''}
- 编程语言：${script}  
- 解法介绍：{${quote}${desc}${quote}}  

${new Array(3).fill(quote).join('')}${script}
${code}
${new Array(3).fill(quote).join('')}
`
        .trim()
        .replace(/\n\n/g, '\n');
}

function problemToTemplate(problem: NonNullable<Awaited<ReturnType<typeof fetchLeetcodeProblem>>>) {
    const { name, url, level, tags, solutions, desc } = problem;
    return `
# ${name}

> 链接：[${name}](${url})  
> 难度：${level}  
> 标签：${tags.join('、')}  
> 简介：{${quote}${desc}${quote}}  

${solutions.map(solutionToTemplate).join('\n\n')}
`.trim();
}

async function fetchLeetcodeProblem(name?: string): Promise<Prisma.LeetcodeProblemGetPayload<{
    include: { solutions: true };
}> | null> {
    if (!name) return null;
    const data = await request({
        url: apiMap.LeetcodeController.getLeetcodeProblems.path,
        method: apiMap.LeetcodeController.getLeetcodeProblems.method,
        data: { name },
        serializer: 'json',
    });
    return data;
}

function LeetCodeProblem({
    promise: problemPromise,
}: {
    promise: ReturnType<typeof fetchLeetcodeProblem>;
}) {
    const problem = React.use(problemPromise);
    const md = React.useMemo(() => (problem ? problemToTemplate(problem) : ''), [problem]);
    if (!problem) null;
    return <Markdown md={md} />;
}

function LeetCodeProblemSkeleton() {
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

export default function Leetcode() {
    const setSummaryNode = useSetAtom(summaryNodeAtom);
    const params = useParams();
    const link = params['*'];
    const [problemPromise, setProblemPromise] = React.useState(fetchLeetcodeProblem);

    useEffect(() => {
        setProblemPromise(() => fetchLeetcodeProblem(link));
        setSummaryNode(<MarkdownSummary />);
    }, [link]);
    if (!link) return <LeetCodeProblemSkeleton />;
    return (
        <Suspense
            fallback={<LeetCodeProblemSkeleton />}
            promise={problemPromise}
            Component={LeetCodeProblem}
        />
    );
}
