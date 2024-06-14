export interface MarkdownTransformer {
  renderToHTML(source: string): string;
}
