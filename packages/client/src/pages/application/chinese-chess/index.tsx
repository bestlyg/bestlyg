import { summaryNodeAtom } from '@/components/app-layout';
import { useSetAtom } from 'jotai';
import React from 'react';
import { Button } from '@/shadcn/ui/button';
import { ChineseChessApplication } from './application';

function ChineseChessSummary() {
    return <>summary</>;
}

export default function ChineseChess() {
    const setSummaryNode = useSetAtom(summaryNodeAtom);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [app, setApp] = React.useState<ChineseChessApplication | null>(null);
    function initApp() {
        if (!containerRef.current) return;
        const app = new ChineseChessApplication(containerRef.current);
        setApp(old => {
            old?.unmount();
            return app;
        });
        setTimeout(
            () =>
                void app.mount().catch(e => {
                    console.log(e);
                }),
            0,
        );
        return () => {
            app.unmount();
        };
    }
    React.useEffect(initApp, []);
    React.useEffect(() => void setSummaryNode(<ChineseChessSummary />), []);
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Button onClick={initApp}>Init</Button>
                <Button
                    onClick={() => {
                        const res = app?.getBoard();
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
