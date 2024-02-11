import { CSSProperties, mark, transformStyleValue, unmark } from '../utils';
import { BestCSSGroupingRule } from './css-grouping-rule';

export class BestCSSStyleRule extends BestCSSGroupingRule {
    get selectorText() {
        return this.cssStyleRule.selectorText;
    }
    get style() {
        return this.cssStyleRule.style;
    }
    get styleMap() {
        return this.cssStyleRule.styleMap;
    }
    constructor(public cssStyleRule: CSSStyleRule) {
        super(cssStyleRule as CSSGroupingRule);
    }
    mount() {
        super.mount();
        mark(this.cssStyleRule, BestCSSStyleRule.name, this);
    }
    unmount() {
        super.unmount();
        unmark(this.cssStyleRule, BestCSSStyleRule.name);
    }
    safetyUpdate(properties: CSSProperties = {}) {
        for (const key of Object.keys(properties)) {
            properties[key] = transformStyleValue(key, properties[key]);
        }
        return this.update(properties);
    }
    update(properties?: CSSProperties) {
        Object.assign(this.cssStyleRule.style, properties);
        return this;
    }
}
