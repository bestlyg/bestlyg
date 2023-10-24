import { version } from './version';
export interface ButtonProps {
    /**
     * The props of container.
     * @default {}
     */
    containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    /**
     * The children of components.
     */
    children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
    console.log('button render', props);
    const prefix = `best-button`;
    console.log('prefix', prefix);
    const { containerProps = {} } = props;
    return (
        <div
            data-version={version}
            {...containerProps}
            className={`${prefix} ${containerProps.className}`}
        >
            button-{props.children}
        </div>
    );
}
