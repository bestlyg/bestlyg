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
            if (k) o[k] = v;
            return o;
        }, {} as Record<string, string>);
    useEffect(() => {
        if (!wallet) return;
        if (Object.keys(query).length) {
            location.search = '';
            localStorage.setItem('query', JSON.stringify(query));
            return;
        }
        let queryFromStorage = null;
        try {
            queryFromStorage = JSON.parse(localStorage.getItem('query'));
        } catch (_) {
            localStorage.removeItem('query');
        }
        if (!queryFromStorage) {
            localStorage.removeItem('query');
            return;
        }
        if (queryFromStorage.type === 'cb') {
            if (
                queryFromStorage.api === 'deposit_account_balance' &&
                queryFromStorage.transactionHashes
            ) {
                const hash = queryFromStorage.transactionHashes;
                wallet.getTransactionResult(hash).then(res => {
                    message.success('deposit success.');
                    const newAccount = { ...account, balance: res };
                    setAccount(newAccount);
                    localStorage.removeItem('query');
                });
            }
        }
    }, [wallet]);
    return query;
}
