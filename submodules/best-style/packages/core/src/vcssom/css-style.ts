import { mark, unmark } from '../utils/mark';
import { __DEV__ } from '../utils';
import { BestCSSStyleSheet } from './css-style-sheet';

export interface StyleOptions {
    document: Document;
}
export class BestStyle {
    sheet: BestCSSStyleSheet;
    style: HTMLStyleElement;
    document: StyleOptions['document'];
    constructor({ document }: StyleOptions) {
        this.document = document;
        this.style = document.createElement('style');
        this.style.dataset['bestStyle'] = 'css';
    }
    mount() {
        this.document.head.appendChild(this.style);
        this.sheet = new BestCSSStyleSheet(this.style.sheet!);
        this.sheet.mount();
        mark(this.style, BestStyle.name, this);
        return this;
    }
    unmount() {
        this.document.body.removeChild(this.style);
        this.sheet.unmount();
        unmark(this.style, BestStyle.name);
        return this;
    }
}
