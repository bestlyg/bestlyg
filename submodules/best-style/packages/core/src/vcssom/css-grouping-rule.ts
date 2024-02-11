import { createSpecificBestCSSRule, getMark, mark, unmark } from '../utils';
import { BestCSSRule } from './css-rule';

export class BestCSSGroupingRule extends BestCSSRule {
    get cssRules() {
        return this.cssGroupingRule.cssRules;
    }
    get cssText() {
        return this.cssGroupingRule.cssText;
    }
    constructor(public cssGroupingRule: CSSGroupingRule) {
        super(cssGroupingRule);
    }
    mount() {
        super.mount();
        mark(this.cssGroupingRule, BestCSSGroupingRule.name, this);
    }
    unmount() {
        super.unmount();
        unmark(this.cssGroupingRule, BestCSSGroupingRule.name);
    }
    insertRule(rule: string, index?: number): number {
        index = this.cssGroupingRule.insertRule(rule, index);
        const cssRule = createSpecificBestCSSRule(this.cssRules.item(index)!);
        if (cssRule) cssRule.mount();
        return index;
    }
    deleteRule(index: number) {
        this.cssGroupingRule.deleteRule(index);
        const cssRule = getMark<BestCSSRule>(this.cssRules.item(index), BestCSSRule.name);
        if (cssRule) cssRule.unmount();
    }
    refreshIndex() {
        for (let index = 0; index < this.cssRules.length; index++) {
            const rule = getMark<BestCSSRule>(this.cssRules[index], BestCSSRule.name);
            if (rule) rule.index = index;
        }
    }
    appendRule(rule: BestCSSRule) {
        const index = this.insertRule(rule.cssText, this.cssRules.length);
        createSpecificBestCSSRule(this.cssRules.item(index)!);
        return index;
    }
    removeRule(rule: BestCSSRule) {
        this.deleteRule(rule.index);
    }
}
