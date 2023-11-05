import clsx from '@best/core/es/deps/clsx';
import { useConfigContext } from '@best/core/es/config-provider';
import { version } from './version';
import { forwardRef } from 'react';
import { ButtonProps } from './interface';

function Button(props: ButtonProps) {
    const {
        prefix,
        defaultConfig: { size: defaultSize },
    } = useConfigContext();
    const prefixCls = `${prefix}-button`;
    const { containerProps = {}, size: propsSize } = props;
    const size = propsSize ?? defaultSize ?? 'medium';
    return (
        <button
            data-version={version}
            {...containerProps}
            className={clsx(
                prefixCls,
                `${prefixCls}-${size}`,
                containerProps.className
            )}
        >
            button-{props.children}
        </button>
    );
}

const ForwardRefButton = forwardRef<unknown, ButtonProps>(Button);

export { ForwardRefButton as Button, ButtonProps };
