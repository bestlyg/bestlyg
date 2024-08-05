import { useQueryString } from '@docusaurus/theme-common';
import { PropsWithChildren } from 'react';
import { secret } from '@bestlyg/config';
import Admonition from '@theme/Admonition';

export function Secret(props: PropsWithChildren<void>) {
    const [qs] = useQueryString(secret.SECURITY_BESTLYG_SECRET_KEY);
    if (qs !== secret.SECURITY_BESTLYG_SECRET_VALUE) {
        return <Admonition type="warning">You have no permission.</Admonition>;
    }
    return props.children;
}
