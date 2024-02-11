import type { Meta, StoryObj } from '@storybook/react';
import { useArgs, useEffect, useState } from '@storybook/preview-api';
import { Button } from '@best-design/button/src/button';
import { Style, useStyles, useStyleRule } from '@best-design/cssinjs/src';

const meta: Meta<typeof Button> = {
    title: 'Best-Design/CssInJs',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        className: 'container',
        children: 'child'
    },
    render: function Render(args) {
        const [props, updateArgs] = useArgs();
        const [val, setVal] = useState(1);
        const [style] = useStyles();
        style.init();
        const rule = useStyleRule({
            container: style,
            suffix: ' .a1',
            properties: { width: val * 10, '--width': val }
        });
        console.log(style, rule);
        return (
            <Button
                {...props}
                className={rule.selector}
                onClick={() => {
                    setVal(val + 1);
                }}
            >
                <div className="a1" style={{ background: 'red', height: 10 }}></div>
                {val}
            </Button>
        );
    }
};
