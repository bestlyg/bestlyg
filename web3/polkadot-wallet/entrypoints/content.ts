import { chrome } from '@polkadot/extension-inject/chrome';

export default defineContentScript({
    matches: ['<all_urls>'],
    main() {
        const MESSAGE_ORIGIN = 'POLKADOT_WALLET';
        // console.log('content script', chrome.runtime.getURL('injected.js'));
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('injected.js');
        script.onload = (): void => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
        (document.head || document.documentElement).appendChild(script);

        // console.log('===> content');
        const port = chrome.runtime.connect({ name: MESSAGE_ORIGIN });
        port.onMessage.addListener((data): void => {
            window.postMessage({ ...data, origin: MESSAGE_ORIGIN + '_CONTENT' }, '*');
        });
        window.addEventListener('message', ({ data, source }): void => {
            // only allow messages from our window, by the inject
            // console.log('window.onmessage', data, source);
            if (source !== window || data.origin !== MESSAGE_ORIGIN + '_PAGE') {
                return;
            }
            port.postMessage(data);
        });
    },
});
