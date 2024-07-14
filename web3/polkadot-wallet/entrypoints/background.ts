import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';

class Extension {
    isConnected = false;
    accounts: { userName: string; keyringPair: KeyringPair }[] = [];

    async connect(url: string) {
        const wsProvider = new WsProvider(url);
        const api = await ApiPromise.create({
            provider: wsProvider,
            types: {},
        });
        await api.isReady;
        return (this.isConnected = true);
    }

    async createAccount(request: { userName: string; mnemonic: string }) {
        const { mnemonic, userName } = request;
        const keyring = new Keyring();
        const newPair = keyring.addFromUri(mnemonic);
        this.accounts.push({
            userName,
            keyringPair: newPair,
        });
        return this.accounts;
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
                    postMessage(extension.accounts);
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
