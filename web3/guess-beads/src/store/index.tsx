import { create } from 'zustand';
import { Wallet, CONTRACT_ADDRESS } from '@/utils';

export interface Account {
    account_id: string;
    balance: string;
}

export interface Store {
    isSignedIn: () => boolean;
    wallet?: Wallet;
    account?: Account;
    initWallet: () => Promise<void>;
}

export const useStore = create<Store>((set, get, useApi) => {
    return {
        isSignedIn() {
            const { wallet } = get();
            return !!wallet?.walletSelector.isSignedIn();
        },
        wallet: null,
        async initWallet() {
            const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
            return wallet.startUp().then(() => {
                set({ wallet });
            });
        },
    };
});
