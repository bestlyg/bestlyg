import clsx from '@best/core/es/deps/clsx';
import { useConfigContext } from '@best/core/es/config-provider';
import { version } from './version';
import { useState } from 'react';

type ElementProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

export interface ButtonProps {
    /**
     * The props of container.
     * @default {}
     */
    containerProps?: ElementProps<HTMLButtonElement>;
    /**
     * The children of components.
     */
    children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
    console.log('render');
    const [state, setState] = useState(1);
    const { prefix } = useConfigContext();
    const prefixCls = `${prefix}-button`;
    const { containerProps = {} } = props;
    return (
        <button
            data-version={version}
            onClick={() => setState(state + 1)}
            {...containerProps}
            className={clsx(prefixCls, containerProps.className)}
        >
            button-{props.children}-{state}
        </button>
    );
}
