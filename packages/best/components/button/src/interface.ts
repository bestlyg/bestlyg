export interface ButtonProps {
    /**
     * The props of container.
     * @default {}
     */
    containerProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >;
    /**
     * The children of components.
     */
    children?: React.ReactNode;
    /**
     * The size of button.
     */
    size?: 'mini' | 'small' | 'medium' | 'large';
}
