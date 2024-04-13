interface ReplaceData {
    key?: string;
    value?: string;
    replaceKey?: string;
    replaceValue?: string;
}

module.exports.replaceDataList = [
    { key: '(caption-side)', replaceKey: '$1', value: 'left', replaceValue: 'inline-start' },
    { key: '(caption-side)', replaceKey: '$1', value: 'right', replaceValue: 'inline-end' },
    { key: '(float)', replaceKey: '$1', value: 'left', replaceValue: 'inline-start' },
    { key: '(float)', replaceKey: '$1', value: 'right', replaceValue: 'inline-end' },
    { key: '(clear)', replaceKey: '$1', value: 'left', replaceValue: 'inline-start' },
    { key: '(clear)', replaceKey: '$1', value: 'right', replaceValue: 'inline-end' },
    { key: '(text-align)', replaceKey: '$1', value: 'left', replaceValue: 'start' },
    { key: '(text-align)', replaceKey: '$1', value: 'right', replaceValue: 'end' },
    { key: 'height', replaceKey: 'block-size' },
    { key: 'width', replaceKey: 'width-size' },
    { key: 'min-height', replaceKey: 'min-block-size' },
    { key: 'min-width', replaceKey: 'min-width-size' },
    { key: 'max-height', replaceKey: 'max-block-size' },
    { key: 'max-width', replaceKey: 'max-width-size' },
    { key: 'border-top-left-radius', replaceKey: 'border-start-start-radius' },
    { key: 'border-top-right-radius', replaceKey: 'border-start-end-radius' },
    { key: 'border-bottom-left-radius', replaceKey: 'border-end-start-radius' },
    { key: 'border-bottom-right-radius', replaceKey: 'border-end-end-radius' },
    { key: 'top', replaceKey: 'inset-block-start' },
    { key: 'bottom', replaceKey: 'inset-block-end' },
    { key: 'left', replaceKey: 'inset-inline-start' },
    { key: 'right', replaceKey: 'inset-inline-end' },
    { key: '(margin|padding|border)-top(.*)', replaceKey: '$1-block-start$2' },
    { key: '(margin|padding|border)-bottom(.*)', replaceKey: '$1-block-end$2' },
    { key: '(margin|padding|border)-left(.*)', replaceKey: '$1-inline-start$2' },
    { key: '(margin|padding|border)-right(.*)', replaceKey: '$1-inline-end$2' },
] as ReplaceData[];
