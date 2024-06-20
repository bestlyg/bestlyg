import clsx from 'clsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const RESUME_NAME_PDF = 'resume.pdf';
export const widthA4 = 794;
export const heightA4 = 1123;
export const paddingA4 = 50;
export const CLASS_NAME_SINGLE = 'resume-page-single';
export const CLASS_NAME_MULTI = 'resume-page-multi';

export const domParser = new DOMParser();

export enum ResumePageType {
    SinglePage = '单页',
    MultiPage = '分页',
}

export const resumePageTypeOptions = [
    { label: ResumePageType.SinglePage, value: ResumePageType.SinglePage },
    { label: ResumePageType.MultiPage, value: ResumePageType.MultiPage },
];

export function renderToSinglePage({ container, html }: { container?: HTMLElement; html: string }) {
    if (!container) return;
    container.innerHTML = '';
    const dom = document.createElement('div');
    dom.className = clsx(CLASS_NAME_SINGLE);
    const inner = document.createElement('div');
    inner.className = clsx(`${CLASS_NAME_SINGLE}-inner`);
    dom.appendChild(inner);
    inner.innerHTML = html;
    container.appendChild(dom);
}

export function createMultiPageContainer() {
    const dom = document.createElement('div');
    dom.className = clsx(`${CLASS_NAME_MULTI}`);
    const inner = document.createElement('div');
    inner.className = clsx(`${CLASS_NAME_MULTI}-inner`);
    dom.appendChild(inner);
    return [dom, inner];
}

export function pixels_to_millimeters(pixels: number, dpi: number) {
    const millimeters = (pixels / dpi) * 25.4;
    return millimeters;
}

export function renderToMultiPage({
    container,
    html,
    getPageHeight,
}: {
    container?: HTMLElement;
    html: string;
    getPageHeight: (pageCount: number) => number;
}) {
    if (!container) return;
    container.innerHTML = '';
    const root = domParser.parseFromString(html, 'text/html');
    const parentArray: Element[] = createMultiPageContainer();
    container.appendChild(parentArray[0]);
    let pageCount = 1;
    tryInsertNodes(root.body.childNodes);
    function tryInsertNodes(nodes: NodeListOf<ChildNode>) {
        nodes.forEach(node => tryInsertNode(node));
    }
    function tryInsertNode(node: ChildNode) {
        const clonedNode = node.cloneNode();
        parentArray[parentArray.length - 1].appendChild(clonedNode);
        if (
            parentArray[1] instanceof HTMLElement &&
            parentArray[1].scrollHeight > getPageHeight(pageCount)
        ) {
            parentArray[parentArray.length - 1].removeChild(clonedNode);
            [parentArray[0], parentArray[1]] = createMultiPageContainer();
            container!.appendChild(parentArray[0]);
            for (let i = 1; i < parentArray.length; i++) {
                parentArray[i] = parentArray[i].cloneNode() as Element;
                parentArray[i - 1].appendChild(parentArray[i]);
            }
            parentArray[parentArray.length - 1].appendChild(clonedNode);
            pageCount += 1;
        }
        if (clonedNode instanceof Element && node.childNodes.length) {
            parentArray.push(clonedNode);
            tryInsertNodes(node.childNodes);
            parentArray.pop();
        }
    }
}

export async function downloadPDFSinglePage(container?: HTMLElement) {
    const dom = container?.querySelector('.resume-page-single') as HTMLElement;
    if (!dom) return;
    const doc = new jsPDF('p', 'px');
    doc.internal.pageSize.width = dom.offsetWidth;
    doc.internal.pageSize.height = dom.offsetHeight;
    const canvas = await html2canvas(dom);
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 0, 0, dom.offsetWidth, dom.offsetHeight);
    doc.save(RESUME_NAME_PDF);
}

export async function downloadPDFMultiPage(container?: HTMLElement) {
    const doms = container?.querySelectorAll('.resume-page-multi') as NodeListOf<HTMLElement>;
    if (!doms) return;
    const doc = new jsPDF('p', 'px');
    for (let i = 0; i < doms.length; i++) {
        if (i) doc.addPage();
        const dom = doms[i];
        doc.internal.pageSize.width = doms[i].offsetWidth;
        doc.internal.pageSize.height = doms[i].offsetHeight;
        const canvas = await html2canvas(dom);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, 0, dom.offsetWidth, dom.offsetHeight);
    }
    doc.save(RESUME_NAME_PDF);
}
