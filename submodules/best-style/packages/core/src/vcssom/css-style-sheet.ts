import { createSpecificBestCSSRule, getMark, mark, unmark } from '../utils';
import { BestCSSRule } from './css-rule';
import { BestCSSRuleList } from './css-rule-list';

export class BestCSSStyleSheet {
    ruleList: BestCSSRuleList;
    get cssRules() {
        return this.ruleList;
    }
    constructor(public cssStyleSheet: CSSStyleSheet) {}
    mount() {
        this.ruleList = new BestCSSRuleList(this.cssStyleSheet.cssRules);
        this.ruleList.mount();
        mark(this.cssStyleSheet, BestCSSStyleSheet.name, this);
    }
    unmount() {
        this.ruleList.unmount();
        unmark(this.cssStyleSheet, BestCSSStyleSheet.name);
    }
    insertRule(rule: string, index?: number) {
        index = this.cssStyleSheet.insertRule(rule, index);
        const cssRule = createSpecificBestCSSRule(this.cssRules.item(index)!);
        if (cssRule) cssRule.mount();
        return index;
    }
    deleteRule(index: number) {
        const rule = getMark<BestCSSRule>(this.cssRules.item(index), BestCSSRule.name);
        if (rule) rule.unmount();
        this.cssStyleSheet.deleteRule(index);
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
