import React, { useContext } from 'react';
import { Context } from '@/context';

export interface Api {
    get_board_metadata: () => Promise<{
        size: [number, number];
        data: {
            pos: [number, number];
            color: [number, number, number, number];
        }[];
    }>;
    set_board: (
        cells: {
            color: number[];
            pos: number[];
        }[]
    ) => Promise<void>;
}

export function useApi(): Api {
    const { wallet } = useContext(Context);
    return {
        get_board_metadata: () =>
            wallet?.viewMethod({
                contractId: 'bestlyg-pixel-board.testnet',
                method: 'get_board_metadata',
            }) ?? Promise.resolve(),
        set_board: (cells: any) =>
            wallet?.callMethod({
                contractId: 'bestlyg-pixel-board.testnet',
                method: 'set_board',
                args: { cells },
            }) ?? Promise.resolve(),
    };
}
