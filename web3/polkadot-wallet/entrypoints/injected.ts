import { injectExtension } from '@polkadot/extension-inject';
import { Injected } from '@polkadot/extension-inject/types';
import { getId } from '@polkadot/extension-base/utils/getId';
import { KeyringPair } from '@polkadot/keyring/types';

export default defineUnlistedScript(() => {
    interface Handler {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve: (data: any) => void;
        reject: (error: Error) => void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        subscriber?: (data: any) => void;
    }
    type Handlers = Record<string, Handler>;
    const handlers: Handlers = {};
    const MESSAGE_ORIGIN = 'POLKADOT_WALLET';

    function handleResponse(data: any): void {
        const handler = handlers[data.id];
        if (!handler) {
            // console.error(`Unknown response: ${JSON.stringify(data)}`);
            return;
        }
        if (!handler.subscriber) {
            delete handlers[data.id];
        }
        if (data.subscription) {
            // eslint-disable-next-line @typescript-eslint/ban-types
            (handler.subscriber as Function)(data.subscription);
        } else if (data.error) {
            handler.reject(new Error(data.error));
        } else {
            handler.resolve(data.response);
        }
    }

    function sendMessage(
        message: any,
        request?: any,
        subscriber?: (data: unknown) => void
    ): Promise<any> {
        return new Promise((resolve, reject): void => {
            const id = getId();
            handlers[id] = { reject, resolve, subscriber };

            const transportRequestMessage = {
                id,
                message,
                origin: MESSAGE_ORIGIN + '_PAGE',
                request,
            };
            // console.log('transportRequestMessage', handlers, transportRequestMessage);
            window.postMessage(transportRequestMessage, '*');
        });
    }

    function enableFn(origin: string): Promise<Injected> {
        return new Promise<Injected>(r => {
            setTimeout(() => {
                r({
                    accounts: {
                        get: () =>
                            sendMessage('get.accounts').then(
                                (res: { keyringPair: KeyringPair; info?: any }[]) => {
                                    console.log('accounts', res);
                                    return res.map(
                                        ({
                                            keyringPair: {
                                                address,
                                                meta: { name },
                                                type,
                                            },
                                        }) => {
                                            return {
                                                address,
                                                name,
                                                type,
                                            };
                                        }
                                    );
                                }
                            ),
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

    console.log('Script was injected!');

    window.addEventListener('message', ({ data, source }: any): void => {
        // only allow messages from our window, by the loader
        if (source !== window || data.origin !== MESSAGE_ORIGIN + '_CONTENT') {
            return;
        }

        console.log('event listener message,', handlers, data, source);

        if (data.id) {
            handleResponse(data);
        } else {
            console.error('Missing id for response.');
        }
    });

    injectExtension(enableFn, {
        name: 'best-wallet',
        version: '0.0.1',
    });
});
