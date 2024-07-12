import { injectExtension } from '@polkadot/extension-inject';
import { Injected } from '@polkadot/extension-inject/types';
import { redirectIfPhishing } from '@polkadot/extension-base/page';

function enableFn(origin: string): Promise<Injected> {
    console.log('enableFn', origin);
    return new Promise<Injected>(r => {
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
    }).then(res => {
        console.log('res', res);
        return res;
    });
}

const inject = () => {
    injectExtension(enableFn, {
        name: 'best-wallet',
        version: '0.0.1',
    });
};

redirectIfPhishing()
    .then(gotRedirected => {
        console.log('====LYG');
        if (!gotRedirected) {
            inject();
        }
    })
    .catch(e => {
        console.warn(
            `Unable to determine if the site is in the phishing list: ${(e as Error).message}`
        );
        inject();
    });
