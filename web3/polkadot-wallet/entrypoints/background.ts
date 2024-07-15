import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { UnsubscribePromise } from '@polkadot/api/types';
class Extension {
    isConnected = false;
    accounts = new Map<string, { keyringPair: KeyringPair; balance?: string }>();
    api: ApiPromise | null = null;
    unSubscribePromises: UnsubscribePromise[] = [];

    async connect(url: string) {
        const wsProvider = new WsProvider(url);
        const api = await ApiPromise.create({
            provider: wsProvider,
            types: {},
        });
        await api.isReady;
        this.api = api;
        return (this.isConnected = true);
    }

    async createAccount(request: { name: string; mnemonic: string }) {
        const { mnemonic, name } = request;
        const keyring = new Keyring({});
        const newPair = keyring.addFromUri(mnemonic, { name });
        this.accounts.set(newPair.address, { keyringPair: newPair });
        const unSubscribe = this.api?.query.system.account(newPair.address, (info: any) => {
            const data = this.accounts.get(newPair.address);
            if (data) data.balance = info.data.free.toHuman();
        }) as any as UnsubscribePromise;
        if (unSubscribe) this.unSubscribePromises.push(unSubscribe);
        return Array.from(this.accounts.values());
    }

    async destory() {
        return Promise.allSettled(this.unSubscribePromises);
    }
}

const extension = new Extension();

export default defineBackground(() => {
    (globalThis as any).document = {};
    console.log('Hello background!', { id: browser.runtime.id });
    chrome.runtime.onConnect.addListener((port): void => {
        console.log('connect', port);
        if (port.name !== 'POLKADOT_WALLET') return;
        port.onMessage.addListener(data => {
            console.log('message', data, new Extension());
            const { id, message, request } = data;
            const postMessage = (response: any) => {
                console.log('postMessage', data, response);
                port.postMessage({ id, response });
            };
            switch (message) {
                case 'init':
                    postMessage('init success');
                    break;
                case 'connect':
                    extension.connect(request).then(postMessage);
                    break;
                case 'get.isConnected':
                    postMessage(extension.isConnected);
                    break;
                case 'get.accounts':
                    postMessage(Array.from(extension.accounts.values()));
                    break;
                case 'create-account':
                    extension.createAccount(request).then(postMessage);
                    break;
                default:
                    postMessage('unknown message');
            }
        });
        port.onDisconnect.addListener(() => console.log(`Disconnected from ${port.name}`));
    });
});
