import { nanoid } from 'nanoid';
import { Application, Assets, Container, Sprite, UnresolvedAsset } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { getAssetRecord } from './asset';
import {
    StyleType,
    ChineseChessPiece,
    ASSET_PREFIX,
    HINT_OFFSET,
    ChineseChessBoard,
    MAX_ROW,
    MAX_COL,
    ACTIVE_PIECE_ALPHA,
    Position,
} from './utils';

export class ChineseChessApplication {
    id = nanoid();
    app = new Application();
    styleType: keyof typeof StyleType = 'style-type-1';
    chessboardContainer = new Container();
    hintContainer = new Container();
    pieceMap = new Map<string, ChineseChessPiece>();
    destroyed = false;
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
    sound = {
        click: Sound.from({
            url: `${ASSET_PREFIX}/audio/click.wav`,
            // autoPlay: true,
            // complete: function () {
            //     console.log('Sound finished');
            // },
        }),
        select: Sound.from({
            url: `${ASSET_PREFIX}/audio/select.wav`,
            // autoPlay: true,
            // complete: function () {
            //     console.log('Sound finished');
            // },
        }),
    };
    constructor(public container: HTMLDivElement) {}
    updateHints(hints: Position[]) {
        this.hintContainer.removeChildren();
        for (const item of hints) {
            const hint = Sprite.from(this.assetRecord.hint.id);
            const { x, y } = this.getPosition(item.x, item.y);
            hint.x = x + HINT_OFFSET;
            hint.y = y + HINT_OFFSET;
            hint.interactive = true;
            hint.on('click', e => {
                e.stopPropagation();
                this.activePiece!.sprite.x = x;
                this.activePiece!.sprite.y = y;
                this.activePiece!.x = item.x;
                this.activePiece!.y = item.y;
                this.delActivePiece();
                this.sound.click.play();
            });
            this.hintContainer.addChild(hint);
        }
    }
    getPosition(x: number, y: number) {
        return {
            x: this.styleTypeData.pointStartX + x * this.styleTypeData.spaceX,
            y: this.styleTypeData.pointStartY + y * this.styleTypeData.spaceY,
        };
    }
    getBoard(): ChineseChessBoard {
        const res = new Array(MAX_ROW).fill(0).map(_ => new Array(MAX_COL).fill(null));
        for (const piece of this.pieceMap.values()) {
            if (piece.alive) res[piece.y][piece.x] = piece;
        }
        return res;
    }
    delActivePiece() {
        this.updateHints([]);
        if (this.activePiece) {
            this.activePiece.sprite.alpha = 1;
            this.activePiece = null;
        }
    }
    setActivePiece(piece: ChineseChessPiece) {
        piece.sprite.alpha = ACTIVE_PIECE_ALPHA;
        this.activePiece = piece;
        const hints = piece.asset.piece!.getHints(piece, this.getBoard());
        this.updateHints(hints);
        this.sound.select.play();
    }
    async mount() {
        if (this.destroyed) return;
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
        await this.drawHints();
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
    async drawHints() {
        this.chessboardContainer.addChild(this.hintContainer);
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
                    alive: true,
                };
                this.pieceMap.set(asset.id + i, piece);

                sprite.on('click', e => {
                    e.stopPropagation();
                    const curActivePiece = this.activePiece;
                    this.delActivePiece();
                    if (!curActivePiece) {
                        this.setActivePiece(piece);
                    } else if (curActivePiece !== piece) {
                        if (curActivePiece.asset.piece!.type !== piece.asset.piece!.type) {
                            if (
                                curActivePiece.asset.piece!.canCapture(
                                    curActivePiece,
                                    piece,
                                    this.getBoard(),
                                )
                            ) {
                                curActivePiece.x = piece.x;
                                curActivePiece.y = piece.y;
                                curActivePiece.sprite.x = piece.sprite.x;
                                curActivePiece.sprite.y = piece.sprite.y;
                                piece.alive = false;
                                piece.sprite.removeFromParent();
                                this.sound.click.play();
                            }
                        } else {
                            this.setActivePiece(piece);
                        }
                    }
                });
            }
        }
    }
    unmount() {
        if (this.app.renderer) {
            this.app.destroy?.(
                { removeView: true },
                // { children: true, texture: true, textureSource: true, context: true, style: true },
            );
        }
        this.destroyed = true;
    }
}
