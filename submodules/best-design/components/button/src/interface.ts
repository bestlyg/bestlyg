export interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'disabled' | 'children'
  > {
  // /**
  //  * @description The props of container.
  //  * @default {}
  //  */
  // containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  /**
   * @description The children of components.
   */
  children?: React.ReactNode;
  /**
   * @description The size of button.
   * @default mini
   */
  size?: 'mini' | 'small' | 'medium' | 'large';
  /**
   * @description The disabled state.
   * @default false
   */
  disabled?: boolean;
}
