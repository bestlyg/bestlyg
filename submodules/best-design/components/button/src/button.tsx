import { forwardRef, useEffect } from 'react';
import clsx from '@best-design/core/es/deps/clsx';
import { useConfigContext } from '@best-design/core/es/config-provider';
import { ButtonProps } from './interface';
import './style/button.less';

function Button(props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>): JSX.Element {
    const {
        prefix,
        defaultConfig: { size: defaultSize }
    } = useConfigContext();
    useEffect(() => {
        console.log('Button first render');
    }, []);
    const prefixCls = `${prefix}-button`;
    const { size: propsSize, className, ...resrProps } = props;
    const size = propsSize ?? defaultSize ?? 'medium';
    return (
        <button
            ref={ref}
            data-v={process.env.VERSION_BEST_DESIGN_BUTTON}
            {...resrProps}
            className={clsx(prefixCls, `${prefixCls}-${size}`, className)}
        >
            button-{props.children}
        </button>
    );
}

const ForwardRefButton = forwardRef<HTMLButtonElement, ButtonProps>(Button) as typeof Button;

export { ForwardRefButton as Button };
export type { ButtonProps };
