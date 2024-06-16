export interface MarkdownTransformer {
    renderToHTML(source: string): Promise<string>;
}

export type TemplateLoadFunction = () => Promise<void>;
export interface ResumeGeneratorOptions {
    markdownTransformer?: MarkdownTransformer;
}
