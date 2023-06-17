export interface Response {
    xhr?: XMLHttpRequest;
    event?: ProgressEvent<EventTarget>;
    data?: any;
}
export function request({
    url,
    method,
    body,
    headers = {},
    beforeSend = () => {},
}: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
    beforeSend?: (xhr: XMLHttpRequest) => void;
}) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    for (const [k, v] of Object.entries(headers)) {
        xhr.setRequestHeader(k, encodeURI(v));
    }
    beforeSend(xhr);
    xhr.send(body);
    return new Promise<Response>((resolve, reject) => {
        const oldOnload: Function | undefined = xhr.onload;
        const oldOnerror: Function | undefined = xhr.onerror;
        xhr.onload = event => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    oldOnload?.(event);
                    resolve({ xhr, event, data });
                } catch (e) {
                    reject({ xhr });
                }
            } else {
                reject({ xhr, event });
            }
        };
        xhr.onerror = event => {
            oldOnerror?.(event);
            reject({ xhr, event });
        };
    });
}
