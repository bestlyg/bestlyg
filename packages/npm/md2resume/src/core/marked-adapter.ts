import { Marked } from 'marked';
import { MarkdownTransformer } from './types';
import { DirectiveConfig, createDirectives, presetDirectiveConfigs } from 'marked-directive';
import * as icons from '@ant-design/icons-svg';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';

const iconDirective: DirectiveConfig = {
    level: 'inline',
    marker: ':',
    renderer(token) {
        if (token.meta.name === 'icon' && icons[token.text]) {
            return renderIconDefinitionToSVGElement(icons[token.text], {
                extraSVGAttrs: { width: '1em', height: '1em', fill: 'currentColor' },
            });
        }
        return false;
    },
};

export class MarkedAdapter implements MarkdownTransformer {
    _marked: Marked;
    get marked() {
        return this._marked;
    }
    constructor() {
        this._marked = new Marked({ async: true });
        this._marked.use(createDirectives(presetDirectiveConfigs.concat([iconDirective])));
    }
    renderToHTML(source: string): Promise<string> {
        return this.marked.parse(source) as Promise<string>;
    }
}
