import { chrome } from '@polkadot/extension-inject/chrome';

export default defineContentScript({
    matches: ['<all_urls>'],
    main() {
        // console.log('content script', chrome.runtime.getURL('injected.js'));
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('injected.js');
        script.onload = (): void => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
        (document.head || document.documentElement).appendChild(script);
    },
});
