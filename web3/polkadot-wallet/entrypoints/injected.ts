import { injectExtension } from '@polkadot/extension-inject';
import { Injected } from '@polkadot/extension-inject/types';

function enableFn(origin: string): Promise<Injected> {
    return new Promise<Injected>(r => {
        setTimeout(() => {
            r({
                accounts: {
                    get: () => Promise.resolve([]),
                    subscribe: () => {
                        return () => {};
                    },
                },
                signer: {},
            });
        }, 1000);
    }).then(res => {
        console.log('enable best-wallet success.', res);
        return res;
    });
}

export default defineUnlistedScript(() => {
    console.log('Script was injected!');
    injectExtension(enableFn, {
        name: 'best-wallet',
        version: '0.0.1',
    });
});
