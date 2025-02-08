import { nanoid } from 'nanoid';
import { Application, Assets, Container, Sprite, UnresolvedAsset } from 'pixi.js';

export interface Position {
    x: number;
    y: number;
}

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

const ID_PREFIX = 'chinese-chess';
const XMidPosition = 4;
const YPosition1 = 9;
const YPosition2 = 0;
const ASSET_PREFIX = `/static?r=false&p=chinese-chess`;
const MAX_ROW = 10;
const MAX_COL = 9;
const ACTIVE_PIECE_ALPHA = 0.5;
const DOT_OFFSET = 10;

type ChineseChessBoard = (ChineseChessPiece | null)[][];
type MoveFn = (pos: ChineseChessPiece, board: ChineseChessBoard) => Position[];

interface ChineseChessAsset {
    id: string;
    asset: UnresolvedAsset;
    piece?: {
        label: string;
        positions: { x: number; y: number }[];
        getDots: MoveFn;
        type: 0 | 1;
    };
}

const dirs1 = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
];

const dirs2 = [
    { x: 1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: 2 },
    { x: -1, y: -2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
];

const dirs3 = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
];

const dirs4 = [
    { x: 2, y: 2 },
    { x: 2, y: -2 },
    { x: -2, y: 2 },
    { x: -2, y: -2 },
];

function pieceInBoard(x: number, y: number) {
    return 0 <= x && x < MAX_COL && 0 <= y && y < MAX_ROW;
}

function pieceInCoreBoard(x: number, y: number, type: 0 | 1) {
    return 3 <= x && x <= 5 && (type ? 0 <= y && y <= 2 : 7 <= y && y <= 9);
}

function pieceInOwnDomain(_: number, y: number, type: 0 | 1) {
    return type ? y <= 4 : y >= 5;
}

const moveFnRecord: Record<
    'line' | 'horse' | 'general' | 'guard' | 'elephant' | 'soldier',
    MoveFn
> = {
    line: (piece, board) => {
        const res: Position[] = [];
        for (const dir of dirs1) {
            let { x, y } = piece;
            for (let i = 1; ; i++) {
                x += dir.x;
                y += dir.y;
                if (pieceInBoard(x, y) && !board[y][x]) res.push({ x, y });
                else break;
            }
        }
        return res;
    },
    horse: (piece, board) => {
        const res: Position[] = [];
        for (const dir of dirs2) {
            const x = piece.x + dir.x;
            const y = piece.y + dir.y;
            if (
                pieceInBoard(x, y) &&
                !board[y][x] &&
                (Math.abs(dir.x) === 2
                    ? !board[piece.y][piece.x + dir.x / 2]
                    : !board[piece.y + dir.y / 2][piece.x])
            )
                res.push({ x, y });
        }
        return res;
    },
    general: (piece, board) => {
        const res: Position[] = [];
        for (const dir of dirs1) {
            const x = piece.x + dir.x;
            const y = piece.y + dir.y;
            if (pieceInCoreBoard(x, y, piece.asset.piece!.type) && !board[y][x]) res.push({ x, y });
        }
        return res;
    },
    guard: (piece, board) => {
        const res: Position[] = [];
        for (const dir of dirs3) {
            const x = piece.x + dir.x;
            const y = piece.y + dir.y;
            if (pieceInCoreBoard(x, y, piece.asset.piece!.type) && !board[y][x]) res.push({ x, y });
        }
        return res;
    },
    elephant: (piece, board) => {
        const res: Position[] = [];
        for (const dir of dirs4) {
            const x = piece.x + dir.x;
            const y = piece.y + dir.y;
            if (
                pieceInBoard(x, y) &&
                pieceInOwnDomain(x, y, piece.asset.piece!.type) &&
                !board[y][x]
            )
                res.push({ x, y });
        }
        return res;
    },
    soldier: (piece, board) => {
        const res: Position[] = [];
        const x = piece.x;
        const y = piece.y + (piece.asset.piece!.type * 2 - 1);
        if (pieceInBoard(x, y) && !board[y][x]) res.push({ x, y });
        if (!pieceInOwnDomain(piece.x, piece.y, piece.asset.piece!.type)) {
            {
                const x = piece.x - 1;
                const y = piece.y;
                if (pieceInBoard(x, y) && !board[y][x]) res.push({ x, y });
            }
            {
                const x = piece.x + 1;
                const y = piece.y;
                if (pieceInBoard(x, y) && !board[y][x]) res.push({ x, y });
            }
        }
        return res;
    },
};

export const getAssetRecord: (
    styleType: keyof typeof StyleType,
) => Record<
    | 'board'
    | 'bg'
    | 'rc'
    | 'rm'
    | 'rx'
    | 'rs'
    | 'rj'
    | 'rp'
    | 'rz'
    | 'bc'
    | 'bm'
    | 'bx'
    | 'bs'
    | 'bj'
    | 'bp'
    | 'bz'
    | 'dot',
    ChineseChessAsset
> = styleType => ({
    board: {
        id: `${ID_PREFIX}-${styleType}-board`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/bg.png`,
            loadParser: 'loadTextures',
        },
    },
    dot: {
        id: `${ID_PREFIX}-${styleType}-dot`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/dot.png`,
            loadParser: 'loadTextures',
        },
    },
    bg: {
        id: `${ID_PREFIX}-${styleType}-bg`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/bg.jpg`,
            loadParser: 'loadTextures',
        },
    },
    rc: {
        id: `${ID_PREFIX}-${styleType}-rc`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/r_c.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 0,
            label: '车',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 4 + XMidPosition,
                y: YPosition1,
            })),
            getDots: moveFnRecord.line,
        },
    },
    rm: {
        id: `${ID_PREFIX}-${styleType}-rm`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/r_m.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 0,
            label: '马',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 3 + XMidPosition,
                y: YPosition1,
            })),
            getDots: moveFnRecord.horse,
        },
    },
    rx: {
        id: `${ID_PREFIX}-${styleType}-rx`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/r_x.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 0,
            label: '相',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 2 + XMidPosition,
                y: YPosition1,
            })),
            getDots: moveFnRecord.elephant,
        },
    },
    rs: {
        id: `${ID_PREFIX}-${styleType}-rs`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/r_s.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 0,
            label: '仕',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 1 + XMidPosition,
                y: YPosition1,
            })),
            getDots: moveFnRecord.guard,
        },
    },
    rj: {
        id: `${ID_PREFIX}-${styleType}-rj`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/r_j.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 0,
            label: '帅',
            positions: [
                {
                    x: XMidPosition,
                    y: YPosition1,
                },
            ],
            getDots: moveFnRecord.general,
        },
    },
    rp: {
        id: `${ID_PREFIX}-${styleType}-rp`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/r_p.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 0,
            label: '炮',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 3 + XMidPosition,
                y: YPosition1 - 2,
            })),
            getDots: moveFnRecord.line,
        },
    },
    rz: {
        id: `${ID_PREFIX}-${styleType}-rz`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/r_z.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 0,
            label: '兵',
            positions: new Array(5).fill(0).map((_, i) => ({
                x: i * 2,
                y: YPosition1 - 3,
            })),
            getDots: moveFnRecord.soldier,
        },
    },
    bc: {
        id: `${ID_PREFIX}-${styleType}-bc`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/b_c.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 1,
            label: '车',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 4 + XMidPosition,
                y: YPosition2,
            })),
            getDots: moveFnRecord.line,
        },
    },
    bm: {
        id: `${ID_PREFIX}-${styleType}-bm`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/b_m.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 1,
            label: '马',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 3 + XMidPosition,
                y: YPosition2,
            })),
            getDots: moveFnRecord.horse,
        },
    },
    bx: {
        id: `${ID_PREFIX}-${styleType}-bx`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/b_x.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 1,
            label: '象',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 2 + XMidPosition,
                y: YPosition2,
            })),
            getDots: moveFnRecord.elephant,
        },
    },
    bs: {
        id: `${ID_PREFIX}-${styleType}-bs`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/b_s.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 1,
            label: '士',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 1 + XMidPosition,
                y: YPosition2,
            })),
            getDots: moveFnRecord.guard,
        },
    },
    bj: {
        id: `${ID_PREFIX}-${styleType}-bj`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/b_j.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 1,
            label: '将',
            positions: [{ x: 4, y: YPosition2 }],
            getDots: moveFnRecord.general,
        },
    },
    bp: {
        id: `${ID_PREFIX}-${styleType}-bp`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/b_p.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 1,
            label: '炮',
            positions: new Array(2).fill(0).map((_, i) => ({
                x: (i * 2 - 1) * 3 + XMidPosition,
                y: YPosition2 + 2,
            })),
            getDots: moveFnRecord.line,
        },
    },
    bz: {
        id: `${ID_PREFIX}-${styleType}-bz`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/b_z.png`,
            loadParser: 'loadTextures',
        },
        piece: {
            type: 1,
            label: '卒',
            positions: new Array(5).fill(0).map((_, i) => ({
                x: i * 2,
                y: YPosition2 + 3,
            })),
            getDots: moveFnRecord.soldier,
        },
    },
});

export interface ChineseChessPiece {
    asset: ChineseChessAsset;
    x: number;
    y: number;
    sprite: Sprite;
}

export class ChineseChessApplication {
    id = nanoid();
    app = new Application();
    styleType: keyof typeof StyleType = 'style-type-1';
    chessboardContainer = new Container();
    dotContainer = new Container();
    pieceMap = new Map<string, ChineseChessPiece>();
    get styleTypeData() {
        return StyleType[this.styleType];
    }
    get assetRecord() {
        return getAssetRecord(this.styleType);
    }
    get assets() {
        return Object.values(this.assetRecord);
    }
    activePiece: ChineseChessPiece | null = null;
    constructor(public container: HTMLDivElement) {}
    setDots(dots: Position[]) {
        this.dotContainer.removeChildren();
        for (const item of dots) {
            const dot = Sprite.from(this.assetRecord.dot.id);
            const { x, y } = this.getPosition(item.x, item.y);
            dot.x = x + DOT_OFFSET;
            dot.y = y + DOT_OFFSET;
            this.dotContainer.addChild(dot);
        }
    }
    getPosition(x: number, y: number) {
        return {
            x: this.styleTypeData.pointStartX + x * this.styleTypeData.spaceX,
            y: this.styleTypeData.pointStartY + y * this.styleTypeData.spaceY,
        };
    }
    getBoardShoot(): ChineseChessBoard {
        const res = new Array(MAX_ROW).fill(0).map(_ => new Array(MAX_COL).fill(null));
        for (const piece of this.pieceMap.values()) {
            res[piece.y][piece.x] = piece;
        }
        return res;
    }
    delActivePiece() {
        this.setDots([])
        if (this.activePiece) {
            this.activePiece.sprite.alpha = 1;
            this.activePiece = null;
        }
    }
    setActivePiece(piece: ChineseChessPiece) {
        piece.sprite.alpha = ACTIVE_PIECE_ALPHA;
        this.activePiece = piece;
        const dots = piece.asset.piece!.getDots(piece, this.getBoardShoot());
        this.setDots(dots);
    }
    async mount() {
        await this.preload();
        await this.app.init({
            antialias: true,
            background: 0xffffff,
            resizeTo: this.container,
        });
        this.app.stage.interactive = true;
        this.app.stage.on('click', () => {
            this.delActivePiece();
        });
        await this.drawBg();
        await this.drawChessboard();
        await this.drawPieces();
        await this.drawDots();
        this.container.appendChild(this.app.canvas);
    }
    async preload() {
        await Assets.load(
            this.assets.map(
                v =>
                    ({
                        ...v.asset,
                        alias: v.id,
                    }) as UnresolvedAsset,
            ),
        );
    }
    async drawBg() {
        const sprite = Sprite.from(this.assetRecord.bg.id);
        sprite.x = 0;
        sprite.y = 0;
        sprite.width = this.app.canvas.width;
        sprite.height = this.app.canvas.height;
        this.app.stage.addChild(sprite);
    }
    async drawDots() {
        this.chessboardContainer.addChild(this.dotContainer);
    }
    async drawChessboard() {
        const sprite = Sprite.from(this.assetRecord.board.id);
        sprite.x = 0;
        sprite.y = 0;
        sprite.width = this.styleTypeData.width;
        sprite.height = this.styleTypeData.height;
        this.chessboardContainer.addChild(sprite);
        this.chessboardContainer.x = this.app.screen.width / 2;
        this.chessboardContainer.y = this.app.screen.height / 2;
        this.chessboardContainer.pivot.x = this.chessboardContainer.width / 2;
        this.chessboardContainer.pivot.y = this.chessboardContainer.height / 2;
        this.app.stage.addChild(this.chessboardContainer);
    }
    async drawPieces() {
        for (const asset of this.assets) {
            if (!asset.piece) continue;
            for (let i = 0; i < asset.piece.positions.length; i++) {
                const p = asset.piece.positions[i];
                const sprite = Sprite.from(asset.id);
                const { x, y } = this.getPosition(p.x, p.y);
                sprite.x = x;
                sprite.y = y;
                sprite.interactive = true;
                this.chessboardContainer.addChild(sprite);
                const piece: ChineseChessPiece = {
                    y: p.y,
                    x: p.x,
                    sprite,
                    asset,
                };
                this.pieceMap.set(asset.id + i, piece);

                sprite.on('click', e => {
                    e.stopPropagation();
                    const curActivePiece = this.activePiece;
                    this.delActivePiece();
                    if (curActivePiece !== piece) this.setActivePiece(piece);
                });
            }
        }
    }
    unmount() {
        this.app.destroy?.({ removeView: true }, { children: true, texture: true });
    }
}
