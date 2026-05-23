export const PY_ENUM_TEMPLATE = `
class {{name}}(StrEnum):
{{#if comment}}
{{indent}}"""
{{indent}}{{&comment}}
{{indent}}"""
{{/if}}
{{#items}}
{{../indent}}{{key}}{{#if value}} = {{&value}}{{/if}}
{{#if comment}}
{{../indent}}"""
{{../indent}}{{&comment}}
{{../indent}}"""
{{/if}}
{{/items}}
`.trim();

export const PY_FIELD_TEMPLATE = `
{{indent}}{{name}}: {{&type}}{{#if value}} = {{value}}{{/if}}
{{#if comment}}
{{indent}}"""
{{indent}}{{&comment}}
{{indent}}"""
{{/if}}
`.trim();

export const PY_TYPE_TEMPLATE = `
@dataclass
class {{name}}{{#if extends}}({{extends}}){{/if}}:
{{#if comment}}
{{indent}}"""
{{indent}}{{&comment}}
{{indent}}"""\n
{{/if}}
{{#each items}}
{{&.}}
{{/each}}
{{^if items.length}}
{{indent}}pass
{{/if}}
`.trim();
