import { useStore } from '@/store';
import { message } from 'antd';
import { useEffect } from 'react';

export function useUrlCallback() {
    const { wallet, setAccount, account } = useStore();
    const query = location.search
        .substring(1)
        .split('&')
        .map(s => s.split('='))
        .reduce((o, [k, v]) => {
            o[k] = v;
            return o;
        }, {} as Record<string, string>);
    // console.log(query);
    useEffect(() => {
        if (!wallet) return;
        if (query.type === 'cb') {
            if (query.api === 'deposit_account_balance' && query.transactionHashes) {
                const hash = query.transactionHashes;
                wallet
                    .getTransactionResult(hash)
                    .then(res => {
                        if (res) return BigInt(res);
                    })
                    .then(res => {
                        message.success('deposit success.');
                        const newAccount = { ...account, balance: res };
                        setAccount(newAccount);
                    });
            }
        }
    }, [wallet]);
    return query;
}
