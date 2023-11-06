/// <reference types="react" />
import type { StoryObj } from '@storybook/react';
import '@best/button/src/style/index.less';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("@best/button/src/button").ButtonProps & import("react").RefAttributes<unknown>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
