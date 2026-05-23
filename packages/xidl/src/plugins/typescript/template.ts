const SEMI = `{{#if config.semi}};{{/if}}`;

export const TS_ENUM_TEMPLATE = `
{{~#if comment}}/** {{&comment}} */\n{{/if~}}
export enum {{name}} {
{{#each items}}
{{~#if comment}}{{../indent}}/** {{comment}} */\n{{/if~}}
{{../indent}}{{key}}{{#if value}} = {{&value}}{{/if}},
{{/each}}
}
`.trim();

export const TS_NAMESPACE_TEMPLATE = `
export * as {{name}} from './{{name}}'${SEMI}
`.trim();

export const TS_TYPE_TEMPLATE = `
{{~#if comment}}/** {{&comment}} */\n{{/if~}}
export interface {{name}}{{#if extends}} extends {{extends}}{{/if}} {
{{#items}}
{{&.}}
{{/items}}
}
`.trim();

export const TS_FIELD_TEMPLATE = `
{{~#if comment}}{{indent}}/** {{&comment}} */\n{{/if~}}
{{indent}}{{name}}{{#optional}}?{{/optional}}: {{&type}}{{#if value}} = {{value}}{{/if}}${SEMI}
`.trim();
