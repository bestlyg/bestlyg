import { Sprite, UnresolvedAsset } from 'pixi.js';

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

export const ID_PREFIX = 'chinese-chess';
export const XMidPosition = 4;
export const YPosition1 = 9;
export const YPosition2 = 0;
export const ASSET_PREFIX = `/static?r=false&p=chinese-chess`;
export const MAX_ROW = 10;
export const MAX_COL = 9;
export const ACTIVE_PIECE_ALPHA = 0.5;
export const HINT_OFFSET = 10;

export type ChineseChessBoard = (ChineseChessPiece | null)[][];
export type MoveFn = (piece: ChineseChessPiece, board: ChineseChessBoard) => Position[];
export type CaptureFn = (
    piece1: ChineseChessPiece,
    piece2: ChineseChessPiece,
    board: ChineseChessBoard,
) => boolean;

export interface ChineseChessAsset {
    id: string;
    asset: UnresolvedAsset;
    piece?: {
        label: string;
        positions: { x: number; y: number }[];
        getHints: MoveFn;
        canCapture: CaptureFn;
        type: 0 | 1;
    };
}

export interface ChineseChessPiece {
    asset: ChineseChessAsset;
    x: number;
    y: number;
    alive: boolean;
    sprite: Sprite;
}

export enum Piece {
    Chariot,
    Cannon,
    Horse,
    General,
    Guard,
    Elephant,
    Soldier,
}
