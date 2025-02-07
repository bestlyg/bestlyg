import { nanoid } from 'nanoid';
import { Application, Assets, Sprite, UnresolvedAsset } from 'pixi.js';

export const StyleType: Record<
    'style-type-1' | 'style-type-2' | 'style-type-3',
    {
        width: number;
        height: number;
        spaceX: number;
        spaceY: number;
        pointStartX: number;
        pointStartY: number;
    }
> = {
    ['style-type-1']: {
        width: 325, //画布宽度
        height: 402, //画布高度
        spaceX: 35, //着点X跨度
        spaceY: 36, //着点Y跨度
        pointStartX: 5, //第一个着点X坐标;
        pointStartY: 19, //第一个着点Y坐标;
    },
    ['style-type-2']: {
        width: 523, //画布宽度
        height: 580, //画布高度
        spaceX: 57, //着点X跨度
        spaceY: 57, //着点Y跨度
        pointStartX: 3, //第一个着点X坐标;
        pointStartY: 5, //第一个着点Y坐标;
    },
    ['style-type-3']: {
        width: 530, //画布宽度
        height: 567, //画布高度
        spaceX: 57, //着点X跨度
        spaceY: 57, //着点Y跨度
        pointStartX: -2, //第一个着点X坐标;
        pointStartY: 0, //第一个着点Y坐标;
    },
} as const;

export const AssetsNameRecord = {
    bg: 'chinese-chess-bg',
    rc: 'chinese-chess-rc',
    rm: 'chinese-chess-rm',
    rx: 'chinese-chess-rx',
    rs: 'chinese-chess-rs',
    rj: 'chinese-chess-rj',
    rp: 'chinese-chess-rp',
    rz: 'chinese-chess-rz',
    bc: 'chinese-chess-bc',
    bm: 'chinese-chess-bm',
    bx: 'chinese-chess-bx',
    bs: 'chinese-chess-bs',
    bj: 'chinese-chess-bj',
    bp: 'chinese-chess-bp',
    bz: 'chinese-chess-bz',
} as const;

export const getAssets: (styleType: keyof typeof StyleType) => UnresolvedAsset[] = styleType => [
    {
        alias: AssetsNameRecord.bg,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/bg.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.rc,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/r_c.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.rm,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/r_m.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.rx,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/r_x.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.rs,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/r_s.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.rj,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/r_j.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.rp,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/r_p.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.rz,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/r_z.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.bc,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/b_c.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.bm,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/b_m.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.bx,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/b_x.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.bs,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/b_s.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.bj,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/b_j.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.bp,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/b_p.png`,
        loadParser: 'loadTextures',
    },
    {
        alias: AssetsNameRecord.bz,
        src: `/static?r=false&p=chinese-chess/img/${styleType}/b_z.png`,
        loadParser: 'loadTextures',
    },
];

const XMidPosition = 4;
const YRedPosition = 9;
const YBlackPosition = 0;

export const InitPieces: { label: string; assets: string; x: number; y: number }[] = [
    {
        label: '帅',
        assets: AssetsNameRecord.rj,
        x: XMidPosition,
        y: YRedPosition,
    },
    ...new Array(2).fill(0).map((_, i) => ({
        label: '仕',
        assets: AssetsNameRecord.rs,
        x: (i * 2 - 1) * 1 + XMidPosition,
        y: YRedPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '相',
        assets: AssetsNameRecord.rx,
        x: (i * 2 - 1) * 2 + XMidPosition,
        y: YRedPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '马',
        assets: AssetsNameRecord.rm,
        x: (i * 2 - 1) * 3 + XMidPosition,
        y: YRedPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '车',
        assets: AssetsNameRecord.rc,
        x: (i * 2 - 1) * 4 + XMidPosition,
        y: YRedPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '炮',
        assets: AssetsNameRecord.rp,
        x: (i * 2 - 1) * 3 + XMidPosition,
        y: YRedPosition - 2,
    })),
    ...new Array(5).fill(0).map((_, i) => ({
        label: '兵',
        assets: AssetsNameRecord.rz,
        x: i * 2,
        y: YRedPosition - 3,
    })),

    {
        label: '将',
        assets: AssetsNameRecord.bj,
        x: 4,
        y: YBlackPosition,
    },
    ...new Array(2).fill(0).map((_, i) => ({
        label: '士',
        assets: AssetsNameRecord.bs,
        x: (i * 2 - 1) * 1 + XMidPosition,
        y: YBlackPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '象',
        assets: AssetsNameRecord.bx,
        x: (i * 2 - 1) * 2 + XMidPosition,
        y: YBlackPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '马',
        assets: AssetsNameRecord.bm,
        x: (i * 2 - 1) * 3 + XMidPosition,
        y: YBlackPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '车',
        assets: AssetsNameRecord.bc,
        x: (i * 2 - 1) * 4 + XMidPosition,
        y: YBlackPosition,
    })),
    ...new Array(2).fill(0).map((_, i) => ({
        label: '炮',
        assets: AssetsNameRecord.bp,
        x: (i * 2 - 1) * 3 + XMidPosition,
        y: YBlackPosition + 2,
    })),
    ...new Array(5).fill(0).map((_, i) => ({
        label: '卒',
        assets: AssetsNameRecord.bz,
        x: i * 2,
        y: YBlackPosition + 3,
    })),
];

export class ChineseChessApplication {
    id = nanoid();
    app = new Application();
    styleType: keyof typeof StyleType = 'style-type-1';
    get styleTypeData() {
        return StyleType[this.styleType];
    }
    get assets() {
        return getAssets(this.styleType);
    }
    constructor(public container: HTMLDivElement) {}
    async mount() {
        await this.preload();
        await this.app.init({
            antialias: true,
            background: 0xff0000,
            width: this.styleTypeData.width,
            height: this.styleTypeData.height,
        });
        await this.drawChessboard();
        await this.drawPieces();
        this.container.appendChild(this.app.canvas);
    }
    async preload() {
        await Assets.load(getAssets(this.styleType));
    }
    async drawChessboard() {
        const bgSprite = Sprite.from(AssetsNameRecord.bg);
        bgSprite.x = 0;
        bgSprite.y = 0;
        this.app.stage.addChild(bgSprite);
    }
    async drawPieces() {
        for (const piece of InitPieces) {
            const sprite = Sprite.from(piece.assets);
            sprite.x = this.styleTypeData.pointStartX + piece.x * this.styleTypeData.spaceX;
            sprite.y = this.styleTypeData.pointStartY + piece.y * this.styleTypeData.spaceY;
            this.app.stage.addChild(sprite);
        }
    }
    unmount() {
        this.app.destroy?.({ removeView: true }, { children: true, texture: true });
    }
}
