import { ReplaceData } from '@less-plugins/replace-properties';

export const cssLogicalMap: ReplaceData[] = [
    { key: '^(caption-side)$', replaceKey: '$1', value: 'left', replaceValue: 'inline-start' },
    { key: '^(caption-side)$', replaceKey: '$1', value: 'right', replaceValue: 'inline-end' },
    { key: '^(float)$', replaceKey: '$1', value: 'left', replaceValue: 'inline-start' },
    { key: '^(float)$', replaceKey: '$1', value: 'right', replaceValue: 'inline-end' },
    { key: '^(clear)$', replaceKey: '$1', value: 'left', replaceValue: 'inline-start' },
    { key: '^(clear)$', replaceKey: '$1', value: 'right', replaceValue: 'inline-end' },
    { key: '^(text-align)$', replaceKey: '$1', value: 'left', replaceValue: 'start' },
    { key: '^(text-align)$', replaceKey: '$1', value: 'right', replaceValue: 'end' },
    { key: '^(min-|max-)?height$', replaceKey: '$1block-size' },
    { key: '^(min-|max-)?width$', replaceKey: '$1inline-size' },
    { key: '^border-top-left-radius$', replaceKey: 'border-start-start-radius' },
    { key: '^border-top-right-radius$', replaceKey: 'border-start-end-radius' },
    { key: '^border-bottom-left-radius$', replaceKey: 'border-end-start-radius' },
    { key: '^border-bottom-right-radius$', replaceKey: 'border-end-end-radius' },
    { key: '^top$', replaceKey: 'inset-block-start' },
    { key: '^bottom$', replaceKey: 'inset-block-end' },
    { key: '^left$', replaceKey: 'inset-inline-start' },
    { key: '^right$', replaceKey: 'inset-inline-end' },
    {
        key: '^(margin|padding|border|scroll-padding|scroll-margin)-top(.*)$',
        replaceKey: '$1-block-start$2',
    },
    {
        key: '^(margin|padding|border|scroll-padding|scroll-margin)-bottom(.*)$',
        replaceKey: '$1-block-end$2',
    },
    {
        key: '^(margin|padding|border|scroll-padding|scroll-margin)-left(.*)$',
        replaceKey: '$1-inline-start$2',
    },
    {
        key: '^(margin|padding|border|scroll-padding|scroll-margin)-right(.*)$',
        replaceKey: '$1-inline-end$2',
    },
];
