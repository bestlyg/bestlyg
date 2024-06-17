export enum ResumePageType {
    SinglePage = '单页',
    MultiPage = '分页',
}

export const resumePageTypeOptions = [
    { label: ResumePageType.SinglePage, value: ResumePageType.SinglePage },
    { label: ResumePageType.MultiPage, value: ResumePageType.MultiPage },
];

export function createPageItemContainer() {
    const dom = document.createElement('div');
    dom.className = 'resume-page-item';
    return dom;
}

export function renderToSignlePage({ container, html }: { container?: HTMLElement; html: string }) {
    if (!container) return;
    container.innerHTML = html;
}

export function renderToMultiPage({
    pageHeight,
    container,
}: {
    pageHeight: number;
    container?: HTMLElement;
}) {
    if (!container) return;
    const pageItemArr: HTMLDivElement[] = [createPageItemContainer()];
    let currentPageItem = pageItemArr[pageItemArr.length - 1];
    let currentHeight = 0;
    const children = Array.from(container.children);
    for (const node of children) {
        console.log(node);
        const style = window.getComputedStyle(node);
        if (currentHeight + parseFloat(style.height) > pageHeight) {
            pageItemArr.push((currentPageItem = createPageItemContainer()));
            currentHeight = 0;
        }
        currentPageItem.appendChild(node.cloneNode(true));
        currentHeight += parseFloat(style.height);
    }
    container.innerHTML = '';
    pageItemArr.forEach(dom => {
        container.appendChild(dom);
    });
}
