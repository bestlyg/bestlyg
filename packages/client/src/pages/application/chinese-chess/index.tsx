import { summaryNodeAtom } from '@/components/app-summary';
import { useSetAtom } from 'jotai';
import React from 'react';
import { Application, Assets, Graphics, Sprite } from 'pixi.js';
import { AspectRatio } from '@/shadcn/ui/aspect-ratio';
import { nanoid } from 'nanoid';
import { Button } from '@/shadcn/ui/button';

function ChineseChessSummary() {
    return <>summary</>;
}

class ChineseChessApplication {
    id = nanoid();
    destroyed = false;
    mounted = false;
    app = new Application();
    container: HTMLDivElement | null = null;
    width = 0;
    height = 0;
    get cellSize() {
        return Math.floor(this.width / 8);
    }
    async mount(container: ChineseChessApplication['container']) {
        if (this.destroyed || !container || this.mounted) return;
        this.mounted = true;
        this.container = container;
        this.width = container.offsetWidth;
        this.height = container.offsetHeight;
        await this.app.init({
            antialias: true,
            background: 0xffffff,
            resizeTo: container,
            width: this.width,
            height: this.height,
        });

        const graphics = new Graphics();
        graphics.rect(1, 1, this.cellSize * 8, this.cellSize * 9);
        graphics.fill(0xffffff);
        graphics.stroke({ width: 1, color: 0xff0000 });
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 8; j++) {
                if (i === 4) continue;
                graphics.rect(
                    this.cellSize * j + 1,
                    this.cellSize * i + 1,
                    this.cellSize,
                    this.cellSize,
                );
                graphics.fill(0xffffff);
                graphics.stroke({ width: 1, color: 0xff0000 });
            }
        }

        this.app.stage.addChild(graphics);
        container.appendChild(this.app.canvas);
    }
    unmount() {
        this.app.destroy?.({ removeView: true }, { children: true, texture: true });
        this.destroyed = true;
    }
}

export default function ChineseChess() {
    const setSummaryNodeAtom = useSetAtom(summaryNodeAtom);
    const appRef = React.useRef(new ChineseChessApplication());
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => void setSummaryNodeAtom(<ChineseChessSummary />), []);
    React.useEffect(() => {
        appRef.current.mount(containerRef.current).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <AspectRatio ratio={3 / 4} className="flex flex-col gap-2">
            <div>
                <Button
                    onClick={() => {
                        appRef.current.unmount();
                        appRef.current = new ChineseChessApplication();
                        appRef.current.mount(containerRef.current).catch(err => {
                            console.log(err);
                        });
                    }}
                >
                    Init
                </Button>
            </div>
            <div ref={containerRef} className="h-full w-full">
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
        </AspectRatio>
    );
}
