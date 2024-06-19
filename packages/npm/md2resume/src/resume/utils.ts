import clsx from 'clsx';

export const widthA4 = 794;
export const heightA4 = 1123;
export const paddingA4 = 50;

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
    dom.className = clsx('resume-page-single');
    const inner = document.createElement('div');
    inner.className = clsx('resume-page-single-inner');
    dom.appendChild(inner);
    inner.innerHTML = html;
    container.appendChild(dom);
}

export function createMultiPageContainer() {
    const dom = document.createElement('div');
    dom.className = clsx('resume-page-multi');
    const inner = document.createElement('div');
    inner.className = clsx('resume-page-multi-inner');
    dom.appendChild(inner);
    return [dom, inner];
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
