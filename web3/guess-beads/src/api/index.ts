import { useStore } from '@/store';

export function get_account_info(): Promise<{
    accoundId: string;
}> {
    const { wallet } = useStore.getState();
    return (
        wallet?.callMethod({
            contractId: 'bestlyg-guess-beads.testnet',
            method: 'get_account_info',
        }) ?? Promise.resolve()
    ).then(res => {
        const hash = res?.transaction?.hash;
        if (hash) wallet.getTransactionResult(hash);
    });
}
