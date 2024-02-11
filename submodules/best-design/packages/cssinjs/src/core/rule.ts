import { useMemo, useInsertionEffect } from 'react';
import type { CSSProperties, CSSRuleContainer } from '../types';
import { propertiesToString, transformStyleValue, usePrevious } from '../utils';
import hash from '@emotion/hash';

export class RuleContainer {
    cache = new Map<string, StyleRule>();
    clearing = false;
    prefix: string;
    cssContainer: CSSRuleContainer;
    constructor({
        prefix = 'css',
        cssContainer = null
    }: { prefix?: string; cssContainer?: CSSRuleContainer } = {}) {
        this.prefix = prefix;
        this.cssContainer = cssContainer;
    }
    clear() {
        if (!this.clearing) {
            this.clearing = true;
            requestIdleCallback(() => {
                const ruleMap = new Map<CSSRule, StyleRule>();
                for (const rule of this.cache.values()) {
                    ruleMap.set(rule.cssRule, rule);
                }
                const rules = this.cssContainer.cssRules;
                for (let i = rules.length - 1; i >= 0; i--) {
                    const rule = ruleMap.get(rules[i]);
                    if (rule?.count === 0) {
                        this.cssContainer.deleteRule(i);
                        this.cache.delete(rule.selector);
                    }
                }
                this.clearing = false;
            });
        }
    }
}

export class Rule {
    count = 0;
    constructor(public container: RuleContainer) {}
    delete() {
        if (--this.count === 0) {
            this.container.clear();
        }
    }
}

export class StyleRule extends Rule {
    selector: string;
    cssRule: CSSStyleRule;
    constructor({
        container,
        cssRule,
        selector
    }: {
        container: RuleContainer;
        cssRule: CSSStyleRule;
        selector: string;
    }) {
        super(container);
        this.cssRule = cssRule;
        this.selector = selector;
    }
    updateStyle(properties: CSSProperties = {}) {
        const style = this.cssRule.style;
        for (const [key, val] of Object.entries(properties)) {
            style?.setProperty(key, transformStyleValue(key, val));
        }
    }
}

export interface CreateStyleRule {
    container: RuleContainer;
    media?: string;
    suffix?: string;
    properties?: CSSProperties;
    prefix?: string;
}

export function createStyleRule({
    suffix = '',
    properties = {},
    container,
    prefix = 'css'
}: CreateStyleRule): StyleRule {
    const propertyStr = propertiesToString(properties);
    const hashedSelector = `${prefix}-${hash(prefix + suffix + propertyStr)}`;
    let ruleInstance = container.cache.get(hashedSelector);
    if (!ruleInstance) {
        const ruleStr = `.${hashedSelector}${suffix}{${propertyStr}}`;
        container.cssContainer.insertRule(ruleStr);
        ruleInstance = new StyleRule({
            container,
            cssRule: container.cssContainer.cssRules[0] as CSSStyleRule,
            selector: hashedSelector
        });
        container.cache.set(hashedSelector, ruleInstance);
    }
    ruleInstance.count += 1;
    return ruleInstance;
}

export function useStyleRule(args: CreateStyleRule) {
    const rule = useMemo(
        () => createStyleRule(args),
        [propertiesToString(args.properties ?? {}), args.suffix]
    );
    useInsertionEffect(() => () => rule.delete(), []);
    const prevDeleteFn = usePrevious(() => rule.delete());
    useInsertionEffect(() => prevDeleteFn?.(), [rule]);
    return rule;
}

export class MediaRule extends Rule {
    cssRule: CSSMediaRule;
    constructor({ container, cssRule }: { container: RuleContainer; cssRule: CSSMediaRule }) {
        super(container);
        this.cssRule = cssRule;
    }
}
