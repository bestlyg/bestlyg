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
    const { containerProps = {} } = props;
    return <div {...containerProps}>button-{props.children}</div>;
}
