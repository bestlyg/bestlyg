import marked from 'marked';

export async function parseMarkdown(md: string): Promise<string> {
    return marked.parse(md, {
        async: true,
    });
}
