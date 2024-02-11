import hash from '@emotion/hash';
import { BestCSSGroupingRule, BestCSSRule, BestCSSStyleRule } from '../vcssom';

export function getRandomClassNameSelector(hashFn = hash, prefix = 'best') {
    return `${prefix}-${hashFn(performance.now().toString())}`;
}

export function createSpecificBestCSSRule(cssRule: CSSRule) {
    if (cssRule instanceof CSSStyleRule) {
        return new BestCSSStyleRule(cssRule);
    } else if (cssRule instanceof CSSGroupingRule) {
        return new BestCSSGroupingRule(cssRule);
    } else if (cssRule instanceof CSSRule) {
        return new BestCSSRule(cssRule);
    } else {
        return null;
    }
}
