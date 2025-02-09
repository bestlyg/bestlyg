import { dirs1, dirs2, dirs3, dirs4 } from './dir';
import { Position, Piece, MoveFn, CaptureFn, ChineseChessPiece, MAX_COL, MAX_ROW } from './utils';

export const moveFnRecord: Record<Piece, MoveFn> = {
    [Piece.Chariot]: (piece, board) => {
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
    [Piece.Cannon]: (...args) => {
        return moveFnRecord[Piece.Chariot](...args);
    },
    [Piece.Horse]: (piece, board) => {
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
    [Piece.General]: (piece, board) => {
        const res: Position[] = [];
        for (const dir of dirs1) {
            const x = piece.x + dir.x;
            const y = piece.y + dir.y;
            if (pieceInCoreBoard(x, y, piece.asset.piece!.type) && !board[y][x]) res.push({ x, y });
        }
        return res;
    },
    [Piece.Guard]: (piece, board) => {
        const res: Position[] = [];
        for (const dir of dirs3) {
            const x = piece.x + dir.x;
            const y = piece.y + dir.y;
            if (pieceInCoreBoard(x, y, piece.asset.piece!.type) && !board[y][x]) res.push({ x, y });
        }
        return res;
    },
    [Piece.Elephant]: (piece, board) => {
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
    [Piece.Soldier]: (piece, board) => {
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

export const captureFnRecord: Record<Piece, CaptureFn> = {
    [Piece.Chariot]: (piece1, piece2, board) => {
        if (piece1.x === piece2.x) {
            let f = true;
            const { x } = piece1;
            for (
                let y = Math.min(piece1.y, piece2.y) + 1;
                y <= Math.max(piece1.y, piece2.y) - 1;
                y++
            ) {
                if (board[y][x]) {
                    f = false;
                    break;
                }
            }
            if (f) return true;
        } else if (piece1.y === piece2.y) {
            let f = true;
            const { y } = piece1;
            for (
                let x = Math.min(piece1.x, piece2.x) + 1;
                x <= Math.max(piece1.x, piece2.x) - 1;
                x++
            ) {
                if (board[y][x]) {
                    f = false;
                    break;
                }
            }
            if (f) return true;
        }
        return false;
    },
    [Piece.Cannon]: (piece1, piece2, board) => {
        if (piece1.x === piece2.x) {
            let midPiece: ChineseChessPiece | null = null;
            const { x } = piece1;
            for (
                let y = Math.min(piece1.y, piece2.y) + 1;
                y <= Math.max(piece1.y, piece2.y) - 1;
                y++
            ) {
                if (board[y][x]) {
                    if (midPiece) return false;
                    midPiece = board[y][x];
                }
            }
            return !!midPiece;
        } else if (piece1.y === piece2.y) {
            let midPiece: ChineseChessPiece | null = null;
            const { y } = piece1;
            for (
                let x = Math.min(piece1.x, piece2.x) + 1;
                x <= Math.max(piece1.x, piece2.x) - 1;
                x++
            ) {
                if (board[y][x]) {
                    if (midPiece) return false;
                    midPiece = board[y][x];
                }
            }
            return !!midPiece;
        }
        return false;
    },
    [Piece.Horse]: (piece1, piece2) => {
        for (const dir of dirs2) {
            const x = piece1.x + dir.x;
            const y = piece1.y + dir.y;
            if (x === piece2.x && y === piece2.y) return true;
        }
        return false;
    },
    [Piece.General]: (piece1, piece2) => {
        for (const dir of dirs1) {
            const x = piece1.x + dir.x;
            const y = piece1.y + dir.y;
            if (x === piece2.x && y === piece2.y) return true;
        }
        return false;
    },
    [Piece.Guard]: (piece1, piece2) => {
        if (!pieceInCoreBoard(piece2.x, piece2.y, piece1.asset.piece!.type)) return false;
        for (const dir of dirs3) {
            const x = piece1.x + dir.x;
            const y = piece1.y + dir.y;
            if (x === piece2.x && y === piece2.y) return true;
        }
        return false;
    },
    [Piece.Elephant]: (piece1, piece2) => {
        if (!pieceInOwnDomain(piece2.x, piece2.y, piece1.asset.piece!.type)) return false;
        for (const dir of dirs4) {
            const x = piece1.x + dir.x;
            const y = piece1.y + dir.y;
            if (x === piece2.x && y === piece2.y) return true;
        }
        return false;
    },
    [Piece.Soldier]: (piece1, piece2) => {
        const up = piece1.asset.piece!.type * 2 - 1;
        if (piece1.x === piece2.x && piece1.y + up === piece2.y) return true;
        if (!pieceInOwnDomain(piece1.x, piece1.y, piece1.asset.piece!.type))
            return (
                (piece1.x === piece2.x - 1 || piece1.x === piece2.x + 1) && piece1.y === piece2.y
            );
        return false;
    },
};

export function pieceInBoard(x: number, y: number) {
    return 0 <= x && x < MAX_COL && 0 <= y && y < MAX_ROW;
}

export function pieceInCoreBoard(x: number, y: number, type: 0 | 1) {
    return 3 <= x && x <= 5 && (type ? 0 <= y && y <= 2 : 7 <= y && y <= 9);
}

export function pieceInOwnDomain(_: number, y: number, type: 0 | 1) {
    return type ? y <= 4 : y >= 5;
}
