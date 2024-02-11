import { mark, unmark } from '../utils';

export class BestCSSRuleList {
    constructor(public cssRuleList: CSSRuleList) {}
    item(index: number) {
        return this.cssRuleList.item(index);
    }
    get length() {
        return this.cssRuleList.length;
    }
    mount() {
        mark(this.cssRuleList, BestCSSRuleList.name, this);
    }
    unmount() {
        unmark(this.cssRuleList, BestCSSRuleList.name);
    }
}
