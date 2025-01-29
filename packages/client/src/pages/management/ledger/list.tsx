import { Suspense } from '@/components/suspense';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { fetch } from '@bestlyg/common/idl/utils';
import { Prisma } from '@bestlyg/data/prisma-client';
import React from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shadcn/ui/table';
import dayjs from 'dayjs';
import { Calendar } from '@/shadcn/ui/calendar';

export type Ledger = Prisma.LedgerGetPayload<{}>;

export const columns: ColumnDef<Ledger>[] = [
    {
        accessorKey: 'date',
        size: 100,
        header: () => '日期',
        cell: info => dayjs(info.getValue() as string).format('YYYY-MM-DD'),
    },
    {
        accessorKey: 'comment',
        header: () => '用途',
        cell: info => info.getValue(),
        size: 200,
    },
    {
        id: 'balance',
        accessorFn: row => (row.balance / 100) * (row.io ? 1 : -1),
        header: () => <div className="text-right">金额</div>,
        cell: info => <div className="text-right">{info.getValue() + '元'}</div>,
        size: 100,
    },
];

function LedgerSkeleton() {
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

async function fetchLedgers(): Promise<Ledger[] | null> {
    const data = await fetch({
        url: '/api/data/ledger',
        method: 'get',
        data: {},
        serializer: 'json',
    });
    return data;
}

function LedgerTable({ promise }: { promise: ReturnType<typeof fetchLedgers> }) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const data = React.use(promise) ?? [];
    const filteredData = React.useMemo(() => {
        return data.filter(
            v => dayjs(v.date).startOf('day').unix() === dayjs(date).startOf('day').unix(),
        );
    }, [data, date]);
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="rounded-md border flex flex-col gap-4">
            <div>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell
                                        key={cell.id}
                                        style={{ width: cell.column.getSize() }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>总计</TableCell>
                        <TableCell className="text-right">
                            {filteredData.reduce(
                                (sum, v) => sum + ((v.io ? 1 : -1) * v.balance) / 100,
                                0,
                            )}
                            元
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

export default function LedgerList() {
    const [promise] = React.useState(fetchLedgers);
    return <Suspense fallback={<LedgerSkeleton />} promise={promise} Component={LedgerTable} />;
}
