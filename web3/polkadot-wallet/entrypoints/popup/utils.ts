import { getId } from '@polkadot/extension-base/utils/getId';

interface Handler {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (data: any) => void;
    reject: (error: Error) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscriber?: (data: any) => void;
}
type Handlers = Record<string, Handler>;
const handlers: Handlers = {};

const port = chrome.runtime.connect({ name: 'POLKADOT_WALLET' });
port.onMessage.addListener((data: any): void => {
    const handler = handlers[data.id];

    if (!handler) {
        console.error(`Unknown response: ${JSON.stringify(data)}`);

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
});

export function sendMessage(
    message: any,
    request?: any,
    subscriber?: (data: unknown) => void
): Promise<any> {
    return new Promise((resolve, reject): void => {
        const id = getId();
        handlers[id] = { reject, resolve, subscriber };
        port.postMessage({ id, message, request: request || {} });
    });
}
