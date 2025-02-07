import { nanoid } from 'nanoid';
import { Application, Assets, Sprite } from 'pixi.js';

const cachedAssets = new Map<string, any>();

export const StyleType: Record<
    'style-type-1' | 'style-type-2' | 'style-type-3',
    {
        width: number;
        height: number;
        spaceX: number;
        spaceY: number;
        pointStartX: number;
        pointStartY: number;
        page: string;
    }
> = {
    ['style-type-1']: {
        width: 325, //画布宽度
        height: 402, //画布高度
        spaceX: 35, //着点X跨度
        spaceY: 36, //着点Y跨度
        pointStartX: 5, //第一个着点X坐标;
        pointStartY: 19, //第一个着点Y坐标;
        page: 'stype_1', //图片目录
    },
    ['style-type-2']: {
        width: 523, //画布宽度
        height: 580, //画布高度
        spaceX: 57, //着点X跨度
        spaceY: 57, //着点Y跨度
        pointStartX: 3, //第一个着点X坐标;
        pointStartY: 5, //第一个着点Y坐标;
        page: 'stype_2', //图片目录
    },
    ['style-type-3']: {
        width: 530, //画布宽度
        height: 567, //画布高度
        spaceX: 57, //着点X跨度
        spaceY: 57, //着点Y跨度
        pointStartX: -2, //第一个着点X坐标;
        pointStartY: 0, //第一个着点Y坐标;
        page: 'stype_3', //图片目录
    },
} as const;

export class ChineseChessApplication {
    id = nanoid();
    app = new Application();
    styleType: keyof typeof StyleType = 'style-type-1';
    get styleTypeData() {
        return StyleType[this.styleType];
    }
    constructor(public container: HTMLDivElement) {}
    async mount() {
        await this.app.init({
            antialias: true,
            background: 0xff0000,
            width: this.styleTypeData.width,
            height: this.styleTypeData.height,
        });
        await this.drawChessboard();
        this.container.appendChild(this.app.canvas);
    }
    async loadAssets(src: string) {
        let asset = cachedAssets.get(src);
        if (!asset)
            cachedAssets.set(
                src,
                (asset = await Assets.load({
                    src,
                    loadParser: 'loadTextures',
                })),
            );
        return asset;
    }
    async drawChessboard() {
        const bgAssets = await this.loadAssets(
            `/static?r=false&p=chinese-chess/img/${this.styleType}/bg.png`,
        );
        const bgSprite = new Sprite(bgAssets);
        bgSprite.x = 0;
        bgSprite.y = 0;
        this.app.stage.addChild(bgSprite);
    }
    unmount() {
        this.app.destroy?.({ removeView: true }, { children: true, texture: true });
    }
}
