import { useStore } from '@/store';
import { Color } from '@/utils';
import { message } from 'antd';

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
    let href = location.href;
    if (!href.endsWith('?')) href += '?';
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'deposit_account_balance',
            deposit: params.deposit,
            callbackUrl: href + 'type=cb&api=deposit_account_balance',
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
        })
        .catch(err => {
            const o = JSON.parse(err.toString().substring(7));
            const msg = o?.kind?.ExecutionError;
            message.error(msg);
        });
}
