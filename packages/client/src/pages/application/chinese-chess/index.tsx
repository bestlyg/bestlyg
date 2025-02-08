import { summaryNodeAtom } from '@/components/app-summary';
import { useSetAtom } from 'jotai';
import React from 'react';
import { Button } from '@/shadcn/ui/button';
import { ChineseChessApplication } from './application';

function ChineseChessSummary() {
    return <>summary</>;
}

export default function ChineseChess() {
    const setSummaryNodeAtom = useSetAtom(summaryNodeAtom);
    const appRef = React.useRef<ChineseChessApplication | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => void setSummaryNodeAtom(<ChineseChessSummary />), []);
    React.useEffect(() => {
        if (appRef.current || !containerRef.current) return;
        appRef.current = new ChineseChessApplication(containerRef.current);
        appRef.current.mount().catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <div className="flex flex-col gap-2">
            <div className='flex gap-2'>
                <Button
                    onClick={() => {
                        appRef.current?.unmount();
                        appRef.current = new ChineseChessApplication(containerRef.current!);
                        appRef.current.mount().catch(err => {
                            console.log(err);
                        });
                    }}
                >
                    Init
                </Button>
                <Button
                    onClick={() => {
                        const res = appRef.current?.getBoardShoot();
                        console.log(res);
                    }}
                >
                    BoardShoot
                </Button>
            </div>
            <div
                ref={containerRef}
                className="h-full w-full flex items-center justify-center min-h-[600px]"
            >
                {/* <button
                    onClick={async () => {
                        const { app } = appRef.current;
                        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
                        const bunny = new Sprite(texture);
                        app.stage.addChild(bunny);
                        bunny.anchor.set(0.5);
                        bunny.x = app.screen.width / 2;
                        bunny.y = app.screen.height / 2;
                        app.ticker.add(time => {
                            bunny.rotation = 0;
                        });
                    }}
                >
                    up
                </button> */}
            </div>
        </div>
    );
}
