import React from 'react';
import { random as randomNum, Compute24 } from './utils';
import { compute24 as compute24_v1 } from './v1';
import { compute24 as compute24_v2 } from './v2';
import { compute24 as compute24_v3 } from './v3';
import { Label } from '@/shadcn/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shadcn/ui/radio-group';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card';

export default function Point24() {
    const compute24Fns: { current: Record<string, Compute24> } = React.useRef({
        v1: compute24_v1,
        v2: compute24_v2,
        v3: compute24_v3,
    });
    const [numCount, setNumCount] = React.useState(4);
    const getRandomNum = () => new Array(numCount).fill(0).map((_) => randomNum(1, 10));
    const [version, setVersion] = React.useState('v2');
    const [nums, setNums] = React.useState(getRandomNum());
    const [target, setTarget] = React.useState(24);
    const [solutions, setSolutions] = React.useState<string[]>([]);
    const compute = () => {
        const solutions = compute24Fns.current[version](nums, ['+', '-', '*', '/'], target);
        // console.log('===solutions===');
        // console.log(solutions);
        setSolutions(Array.from(new Set(solutions).values()));
        console.log('======TIME COMPARATION======');
        for (const [k, fn] of Object.entries(compute24Fns.current)) {
            console.time(k);
            fn(nums, ['+', '-', '*', '/'], target);
            console.timeEnd(k);
        }
    };
    const random = () => {
        setNums(getRandomNum());
        setSolutions([]);
    };
    React.useEffect(() => {
        random();
    }, [numCount]);
    return (
        <div className="flex flex-col gap-4">
            <RadioGroup
                className="flex"
                onValueChange={(e) => {
                    setVersion(e);
                }}
                value={version}
            >
                {Object.keys(compute24Fns.current).map((v, i) => (
                    <div className="flex items-center space-x-2" key={i}>
                        <RadioGroupItem value={v} id={v} />
                        <Label htmlFor={v}>{v}</Label>
                    </div>
                ))}
            </RadioGroup>
            <div className="flex items-center gap-1.5">
                <Label htmlFor="numCount">Num Count</Label>
                <Input
                    type="number"
                    id="numCount"
                    className="w-[180px]"
                    value={numCount}
                    onChange={(e) => {
                        const num = Number(e.target.value);
                        if (!Number.isNaN(num)) setNumCount(num);
                    }}
                />
            </div>
            <div className="flex items-center gap-1.5">
                <Label htmlFor="target">Target</Label>
                <Input
                    type="number"
                    id="target"
                    className="w-[180px]"
                    value={target}
                    onChange={(e) => {
                        const num = Number(e.target.value);
                        if (!Number.isNaN(num)) setTarget(num);
                    }}
                />
            </div>
            <div className="flex gap-2">
                {nums.map((v, index) => (
                    <Input
                        key={index}
                        value={v}
                        onChange={(e) => {
                            const num = Number(e.target.value);
                            if (!Number.isNaN(num)) {
                                const newNums = [...nums];
                                newNums[index] = num;
                                setNums(newNums);
                            }
                        }}
                    />
                ))}
            </div>
            <div className="flex items-center gap-1.5">
                <Button onClick={compute} variant="outline">
                    Compute
                </Button>
                <Button onClick={random} variant="outline">
                    Random
                </Button>
            </div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                    {solutions.map((v, i) => (
                        <div key={i}>{`${v} = ${target}`}</div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
