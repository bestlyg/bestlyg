import clsx from 'clsx';
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
    dom.innerHTML = html;
    container.appendChild(dom);
}

export function createMultiPageContainer() {
    const dom = document.createElement('div');
    dom.className = clsx('resume-page-multi');
    return dom;
}

export function renderToMultiPage({
    pageHeight,
    pageWidth,
    container,
}: {
    pageHeight: number;
    pageWidth: number;
    container?: HTMLElement;
}) {
    if (!container) return;
    const children = Array.from(container.children[0].childNodes);
    container.innerHTML = '';
    const parentArray: Element[] = [createMultiPageContainer()];
    container.appendChild(parentArray[0]);
    tryInsertNodes(children);
    // const pageItemArr: HTMLDivElement[] = [createMultiPageContainer()];
    // let currentPageItem = pageItemArr[pageItemArr.length - 1];
    // let currentHeight = 0;
    // const children = Array.from(container.children).flatMap(node =>
    //     node.className.includes('resume-page-single') ? Array.from(node.children) : node
    // );
    // for (const node of children) {
    //     const style = window.getComputedStyle(node);
    //     if (currentHeight + parseFloat(style.height) > pageHeight) {
    //         pageItemArr.push((currentPageItem = createMultiPageContainer()));
    //         currentHeight = 0;
    //     }
    //     currentPageItem.appendChild(node.cloneNode(true));
    //     currentHeight += parseFloat(style.height);
    // }
    // container.innerHTML = '';
    // pageItemArr.forEach(dom => {
    //     container.appendChild(dom);
    // });
    function tryInsertNodes(nodes: ChildNode[]) {
        nodes.forEach(el => tryInsertNode(el));
    }
    function tryInsertNode(node: ChildNode) {
        console.log('try', node, parentArray);
        parentArray[parentArray.length - 1].appendChild(node);
        if (parentArray[0].scrollHeight > pageHeight) {
            parentArray[parentArray.length - 1].removeChild(node);
            container!.appendChild((parentArray[0] = createMultiPageContainer()));
            for (let i = 1; i < parentArray.length; i++) {
                parentArray[i] = parentArray[i].cloneNode() as Element;
                parentArray[i - 1].appendChild(parentArray[i]);
            }
            parentArray[parentArray.length - 1].appendChild(node);
        }
        if (node instanceof Element && node.children.length) {
            parentArray.push(node);
            tryInsertNodes(Array.from(node.childNodes));
            parentArray.pop();
        }
    }
}
