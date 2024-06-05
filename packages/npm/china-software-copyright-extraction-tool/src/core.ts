import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import xml from 'xml';
import R from 'ramda';
import { path, fs, glob } from 'zx';
import {
    CHARS_PER_LINE,
    CWD,
    DEV,
    LINES_PER_PAGE,
    MAX_HALF_LINES,
    MAX_HALF_PAGE,
} from './utils/constants';
import { resolve } from './utils/functions';
import { formatCode } from './utils/format-code';
import { print } from './utils/print';
export interface ToolOption {
    outputPath: string;
    globPath: string[];
    ignorePath: string[];
}
async function findFilePaths({ globPath, ignorePath }: ToolOption) {
    const files = await glob(globPath, { ignore: ignorePath, cwd: CWD });
    return files.map(filePath => resolve(CWD, filePath));
}

function formatCodeList(codeList: string[], reverse = false): string[] {
    const res: string[] = [];
    const op = reverse ? 'unshift' : 'push';
    const [start, end, step] = reverse ? [codeList.length - 1, -1, -1] : [0, codeList.length, 1];
    for (let i = start, sum = 0; i != end; i += step) {
        const line = Math.ceil(codeList[i].length / LINES_PER_PAGE);
        if (sum + line > MAX_HALF_LINES) {
            res[op](
                reverse
                    ? codeList[i].substring(
                          codeList[i].length - (MAX_HALF_LINES - sum) * CHARS_PER_LINE
                      )
                    : codeList[i].substring(0, (MAX_HALF_LINES - sum) * CHARS_PER_LINE)
            );
            break;
        } else {
            res[op](codeList[i]);
            sum += line;
        }
    }
    return res;
}

async function getFormatedCodeList(filePaths: string[]) {
    const codeList: string[] = [];
    let curFileIdx = 0;
    // 前30页
    while (curFileIdx < filePaths.length && codeList.length <= MAX_HALF_LINES) {
        const filePath = filePaths[curFileIdx++];
        const code = await fs.readFile(filePath, 'utf-8');
        const formatedFileData = formatCode(code, path.extname(filePath));
        // console.log(`======> filePath = ${filePath}`);
        // console.log(`code`);
        // console.log(code);
        // console.log(`stringify code`);
        // console.log(JSON.stringify(formatedFileData));
        // console.log('formatedFileData');
        // console.log(formatedFileData);
        // DEV && codeList.push(`===> FilePath = ${filePath}`);
        // console.log(formatedFileData.split('\n'));
        codeList.push(...formatedFileData.split('\n'));
        // return codeList.map(content => ({ content }));
    }
    // 后30页
    const lastCodeList: string[] = [];
    for (
        let lastCurFileIdx = filePaths.length - 1;
        lastCurFileIdx > curFileIdx && lastCodeList.length <= MAX_HALF_LINES;
        lastCurFileIdx--
    ) {
        const filePath = filePaths[lastCurFileIdx];
        const code = await fs.readFile(filePath, 'utf-8');
        const formatedFileData = formatCode(code, path.extname(filePath));
        lastCodeList.unshift(...formatedFileData.split('\n'));
        DEV && lastCodeList.unshift(`===> FilePath = ${filePath}`);
    }
    DEV &&
        console.log(`before codeList = ${codeList.length}, lastCodeList = ${lastCodeList.length} `);
    if (lastCodeList.length + codeList.length > MAX_HALF_LINES * 2) {
        lastCodeList.splice(0, lastCodeList.length - MAX_HALF_LINES);
        codeList.length = MAX_HALF_LINES;
    }
    DEV &&
        console.log(`after codeList = ${codeList.length}, lastCodeList = ${lastCodeList.length} `);
    codeList.push(`====== HALF DIVIDER ======`);
    return codeList.concat(lastCodeList).map(content => ({ content }));
}

export class Doc {
    inited = false;
    doc: docxtemplater<PizZip>;
    constructor() {}
    setData(data: any) {
        this.doc.setData(data);
    }
    async init() {
        const content = await fs.readFile(resolve('template.docx'), 'binary');
        // 创建一个docxtemplater实例
        const doc = new docxtemplater(new PizZip(content));
        this.doc = doc;
        this.inited = true;
    }
    async output(outputPath) {
        // 生成新的文档
        this.doc.render();
        // 将文档输出为新的docx文件
        const buf = this.doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });
        await fs.writeFile(path.resolve(CWD, outputPath), buf);
    }
}

export async function getLinesOfCode(filePaths: string[]) {
    const arr = await Promise.all(
        filePaths.map(async filePath => {
            const code = await fs.readFile(filePath, 'utf-8');
            const formatedFileData = formatCode(code, path.extname(filePath));
            return formatedFileData.split('\n').length;
        })
    );
    return R.sum(arr);
}

export async function chinaSoftwareCopyrightExtractionTool(option: ToolOption) {
    const { outputPath } = option;
    print.divider();
    print.info(`OutputPath: ${option.outputPath}`);
    if (option.globPath.length) {
        print.info(`GlobPath  :`);
        option.globPath.forEach(p => print.info(' '.repeat(12) + p));
    }
    if (option.ignorePath.length) {
        print.info(`IgnorePath:`);
        option.ignorePath.forEach(p => print.info(' '.repeat(12) + p));
    }
    print.divider();
    const doc = new Doc();
    await doc.init();
    const filePaths = await findFilePaths(option);
    print.info(`Find ${filePaths.length} files.`);
    print.info(`Total number of lines of code: ${await getLinesOfCode(filePaths)} lines.`);
    filePaths.forEach((filePath, idx) =>
        print.info(
            `${(idx + 1).toString().padStart(filePaths.length.toString().length, '0')}: ${filePath}`
        )
    );
    // 对文档模板中的占位符进行替换
    // const code = files
    //     .slice(0, 2)
    //     .map(({ content }) => content)
    //     .join('\n');
    // console.log('code');
    // console.log(JSON.stringify(code));
    // console.log(code);
    // const list = transformToTemplate(files);
    const list = await getFormatedCodeList(
        filePaths
        // .slice(0, 2)
    );
    // console.log(list);
    doc.setData({ list });
    await doc.output(outputPath);
    print.success('Extraction success');
}
