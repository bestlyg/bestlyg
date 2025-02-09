import { moveFnRecord, captureFnRecord } from './functions';
import {
    ChineseChessAsset,
    ID_PREFIX,
    ASSET_PREFIX,
    XMidPosition,
    YPosition1,
    Piece,
    YPosition2,
    StyleType,
} from './utils';

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
    | 'hint',
    ChineseChessAsset
> = styleType => ({
    board: {
        id: `${ID_PREFIX}-${styleType}-board`,
        asset: {
            src: `${ASSET_PREFIX}/img/${styleType}/bg.png`,
            loadParser: 'loadTextures',
        },
    },
    hint: {
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
            getHints: moveFnRecord[Piece.Chariot],
            canCapture: captureFnRecord[Piece.Chariot],
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
            getHints: moveFnRecord[Piece.Horse],
            canCapture: captureFnRecord[Piece.Horse],
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
            getHints: moveFnRecord[Piece.Elephant],
            canCapture: captureFnRecord[Piece.Elephant],
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
            getHints: moveFnRecord[Piece.Guard],
            canCapture: captureFnRecord[Piece.Guard],
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
            getHints: moveFnRecord[Piece.General],
            canCapture: captureFnRecord[Piece.General],
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
            getHints: moveFnRecord[Piece.Cannon],
            canCapture: captureFnRecord[Piece.Cannon],
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
            getHints: moveFnRecord[Piece.Soldier],
            canCapture: captureFnRecord[Piece.Soldier],
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
            getHints: moveFnRecord[Piece.Chariot],
            canCapture: captureFnRecord[Piece.Chariot],
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
            getHints: moveFnRecord[Piece.Horse],
            canCapture: captureFnRecord[Piece.Horse],
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
            getHints: moveFnRecord[Piece.Elephant],
            canCapture: captureFnRecord[Piece.Elephant],
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
            getHints: moveFnRecord[Piece.Guard],
            canCapture: captureFnRecord[Piece.Guard],
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
            getHints: moveFnRecord[Piece.General],
            canCapture: captureFnRecord[Piece.General],
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
            getHints: moveFnRecord[Piece.Cannon],
            canCapture: captureFnRecord[Piece.Cannon],
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
            getHints: moveFnRecord[Piece.Soldier],
            canCapture: captureFnRecord[Piece.Soldier],
        },
    },
});
