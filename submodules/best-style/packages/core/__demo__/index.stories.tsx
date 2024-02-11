import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import {
    BestCSSStyleRule,
    BestStyle,
    getRandomClassNameSelector,
    createSpecificBestCSSRule
} from '@best-style/core/src';
import { useEffect, useMemo, useInsertionEffect, useState } from 'react';

const meta: Meta = {
    title: 'Best-Design/Style',
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        className: 'container',
        children: 'child'
    },
    render: function Render(args) {
        const style = useMemo(() => new BestStyle({ document }), []);
        const classNameSelector = useMemo(() => getRandomClassNameSelector(), []);
        const [styleRule, setStyleRule] = useState<BestCSSStyleRule>();
        const [w, setW] = useState(1);
        useInsertionEffect(() => {
            styleRule?.safetyUpdate({ width: w * 10 });
        }, [w]);
        useEffect(() => {
            style.mount();
            const index = style.sheet.insertRule(`.${classNameSelector}{}`);
            const styleRule = createSpecificBestCSSRule(
                style.sheet.cssRules.item(index)!
            ) as BestCSSStyleRule;
            styleRule.safetyUpdate({ width: w * 10, background: 'blue' });
            setStyleRule(styleRule);
            console.log(style, styleRule);
            return () => {
                style.unmount();
            };
        }, []);
        console.log(style);
        return (
            <div>
                <div className={`a b ${classNameSelector}`}>123</div>
                <button
                    onClick={() => {
                        console.log('click', styleRule);
                        setW(w + 1);
                    }}
                >
                    update
                </button>
                <button
                    onClick={() => {
                        style.sheet.refreshIndex();
                        if (styleRule) {
                            style.sheet.removeRule(styleRule);
                        }
                    }}
                >
                    unmount
                </button>
            </div>
        );
    }
};
