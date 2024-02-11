import { BestCSSStyleSheet } from './css-style-sheet';
import { getMark, mark, unmark } from '../utils';

export class BestCSSRule {
    index = 0;
    get parentRule() {
        return getMark<BestCSSRule | null>(this.cssRule.parentRule, BestCSSRule.name);
    }
    get parentStyleSheet() {
        return getMark<BestCSSStyleSheet | null>(
            this.cssRule.parentStyleSheet,
            BestCSSStyleSheet.name
        );
    }
    get cssText() {
        return this.cssRule.cssText;
    }
    constructor(public cssRule: CSSRule) {}
    mount() {
        mark(this.cssRule, BestCSSRule.name, this);
    }
    unmount() {
        unmark(this.cssRule, BestCSSRule.name);
    }
}
