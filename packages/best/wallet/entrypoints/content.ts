import { injectExtension } from '@polkadot/extension-inject';
import { Injected } from '@polkadot/extension-inject/types';

function enableFn(origin: string): Promise<Injected> {
    console.log('enableFn', origin);
    return new Promise(r => {
        setTimeout(() => {
            console.log('active');
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
    });
}

export default defineContentScript({
    matches: ['https://lkcoffee.com/*', '<all_urls>'],
    main() {
        console.log('Injecting best wallet');
        injectExtension(enableFn, {
            name: 'best-wallet',
            version: '0.0.1',
        });
    },
});
