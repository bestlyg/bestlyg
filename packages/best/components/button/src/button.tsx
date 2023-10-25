import clsx from '@best/core/es/deps/clsx';
import { useConfigContext } from '@best/core/es/config-provider';
import { version } from './version';

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
    const { prefix } = useConfigContext();
    const prefixCls = `${prefix}-button`;
    console.log('button render', props);
    const { containerProps = {} } = props;
    return (
        <button
            data-version={version}
            {...containerProps}
            className={clsx(prefixCls, containerProps.className)}
        >
            button-{props.children}
        </button>
    );
}
