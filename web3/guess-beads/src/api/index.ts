import { useStore } from '@/store';
import { Color } from '@/utils';

export function get_account_info(): Promise<{
    accoundId: string;
    balance: number;
}> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'get_account_info',
        }) ?? Promise.resolve()
    ).then(res => {
        const hash = res?.transaction?.hash;
        if (hash) return wallet.getTransactionResult(hash);
    });
}
export function get_account_balance(): Promise<string> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'get_account_balance',
        }) ?? Promise.resolve()
    ).then(res => {
        const hash = res?.transaction?.hash;
        if (hash) return wallet.getTransactionResult(hash);
    });
}

export function deposit_account_balance(params: { deposit: string }): Promise<string> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'deposit_account_balance',
            deposit: params.deposit,
            callbackUrl: location.origin + '?type=cb&api=deposit_account_balance',
        }) ?? Promise.resolve()
    ).then(res => {
        const hash = res?.transaction?.hash;
        if (hash) return wallet.getTransactionResult(hash);
    });
}

export function withdraw_account_balance(params: { balance: string }): Promise<string> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'withdraw_account_balance',
            args: {
                balance: params.balance,
            },
        }) ?? Promise.resolve()
    ).then(res => {
        const hash = res?.transaction?.hash;
        if (hash) return wallet.getTransactionResult(hash);
    });
}

export function guess_beads(): Promise<{
    balance: string;
    benefits: string;
    pick_list: Color[];
}> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'guess_beads',
        }) ?? Promise.resolve()
    )
        .then(res => {
            const hash = res?.transaction?.hash;
            if (hash) return wallet.getTransactionResult(hash);
        })
        .then(res => {
            console.log('Guess Result: ', res);
            return res;
        });
}

// balance:1.3e+25
// benefits:1
// pick_list:Array(12)
// 0:"Green"
// 1:"Blue"
// 2:"Green"
// 3:"Blue"
// 4:"Red"
// 5:"Red"
// 6:"Green"
// 7:"Green"
// 8:"Blue"
// 9:"Blue"
// 10:"Red"
// 11:"Red"
