import { ButtonProps } from './interface';

export default function Button(props: React.PropsWithChildren<ButtonProps>) {
    console.log('button render', props);
    return <div>button-{props.children}</div>;
}
