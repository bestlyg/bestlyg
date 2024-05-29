import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import xml from 'xml';
import { path, fs, glob } from 'zx';
import { CWD } from './utils/constants';
import { resolve } from './utils/functions';
import { formatCode } from './utils/format-code';
export interface ToolOption {
    outputPath: string;
    globPath: string[];
    ignorePath: string[];
}
async function findFiles({ globPath, ignorePath }: ToolOption) {
    const files = await glob(globPath, { ignore: ignorePath, cwd: CWD });
    return Promise.all(
        files.map(async filePath => {
            const content = await fs.readFile(filePath, 'utf-8');
            return {
                filePath,
                content: formatCode(content, path.extname(filePath)),
            };
        })
    );
}
export async function chinaSoftwareCopyrightExtractionTool(option: ToolOption) {
    const { outputPath = CWD, globPath = [], ignorePath = [] } = option;
    const content = await fs.readFile(resolve('template.docx'), 'binary');
    // 创建一个docxtemplater实例
    const doc = new docxtemplater(new PizZip(content));
    const files = await findFiles(option);
    // 对文档模板中的占位符进行替换
    const code = files
        // .slice(0, 1)
        .map(({ content }) => content)
        .join('\n');
    console.log('code');
    console.log(JSON.stringify(code));
    console.log(code);
    doc.setData({ code });
    // 生成新的文档
    doc.render();
    // 将文档输出为新的docx文件
    const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
    });
    await fs.writeFile(path.resolve(CWD, outputPath), buf);
    console.log('create success');
}
