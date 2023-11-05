import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Button } from '@best/button/src/button';
import '@best/button/src/style/index.less';
// function Button() {
//     return <div>123</div>
// }

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        containerProps: { className: 'container' },
        children: 'child',
    },
    // render(...args) {
    //     console.log(args);
    //     return <Button>c</Button>;
    // },
    render: function Render(args) {
        const [props, updateArgs] = useArgs();
        console.log('storyBook render, ', args, useArgs());
        return <Button {...props} />;
    },
};
