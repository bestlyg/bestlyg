import { useStore } from '@/store';

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
export function get_account_balance(): Promise<bigint> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'get_account_balance',
        }) ?? Promise.resolve()
    )
        .then(res => {
            const hash = res?.transaction?.hash;
            if (hash) return wallet.getTransactionResult(hash);
        })
        .then(res => {
            if (res) return BigInt(res);
        });
}

export function deposit_account_balance(params: { deposit: string }): Promise<bigint> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'deposit_account_balance',
            deposit: params.deposit,
            callbackUrl: location.origin + '?type=cb&api=deposit_account_balance',
        }) ?? Promise.resolve()
    )
        .then(res => {
            const hash = res?.transaction?.hash;
            if (hash) return wallet.getTransactionResult(hash);
        })
        .then(res => {
            if (res) return BigInt(res);
        });
}

export function withdraw_account_balance(params: { balance: string }) {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'withdraw_account_balance',
            args: {
                balance: params.balance,
            },
        }) ?? Promise.resolve()
    )
        .then(res => {
            const hash = res?.transaction?.hash;
            if (hash) return wallet.getTransactionResult(hash);
        })
        .then(res => {
            if (res) return BigInt(res);
        });
}
