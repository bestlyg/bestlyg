// import { ButtonProps } from './interface';

export interface ButtonProps {
    /**
     * @description The props of container.
     * @default {}
     */
    containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    children?: React.ReactNode;
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label?: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

export default function Button(props: ButtonProps) {
    console.log('button render', props);
    const { containerProps = {} } = props;
    return <div {...containerProps}>button-{props.children}</div>;
}
