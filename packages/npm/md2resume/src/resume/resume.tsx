import { ResumeGenerator } from '../core/resume-generator';
import { debounce } from 'lodash';
import { Button, Radio, Space } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import templateStyles from './template.module.less';
import resumeStyles from './resume.module.less';
import clsx from 'clsx';
import {
    ResumePageType,
    heightA4,
    renderToMultiPage,
    renderToSinglePage,
    resumePageTypeOptions,
    widthA4,
    paddingA4,
    downloadPDFSinglePage,
    downloadPDFMultiPage,
    a4SizeInPixels,
} from './utils';

export interface ResumeProps {
    resumeSource: string;
}

export function Resume(props: ResumeProps) {
    const [resumePageType, setResumePageType] = useState(ResumePageType.MultiPage);
    const { resumeSource } = props;
    const resumeGeneratorRef = useRef<ResumeGenerator>();
    const [templateStyle, setTemplateStyle] = useState('');
    const resumeRef = useRef<HTMLDivElement>({} as HTMLDivElement);
    const [html, setHTML] = useState('');
    const [size, setSize] = useState<ReturnType<typeof a4SizeInPixels>>({
        width: widthA4,
        height: heightA4,
    });
    useEffect(() => {
        async function run() {
            const resumeGenerator = (resumeGeneratorRef.current = new ResumeGenerator());
            await resumeGenerator.registerTemplate('resume-template1', () => {
                setTemplateStyle('resume-template1');
                return Promise.resolve();
            });
            await resumeGenerator.loadTemplate('resume-template1');
            const html = await resumeGenerator.renderToHTML(resumeSource);
            // setHTML(`<li>aaa<code>bbb</code></li>`);
            setHTML(html);
        }
        run();
        setSize(a4SizeInPixels());
    }, []);
    const renderToPage = debounce(() => {
        if (!resumeRef.current) return;
        if (resumePageType === ResumePageType.SinglePage) {
            resumeRef.current.innerHTML = html;
            renderToSinglePage({
                container: resumeRef.current,
                html,
            });
        } else if (resumePageType === ResumePageType.MultiPage) {
            renderToMultiPage({
                container: resumeRef.current,
                html,
                getPageHeight: count =>
                    count === 1 ? size.height - paddingA4 : size.height - 2 * paddingA4,
            });
        }
    }, 300);
    useLayoutEffect(() => {
        renderToPage();
    }, [resumePageType, html]);
    const [downloadPDF, setDownloadPDF] = useState(false);
    return (
        <ResizeObserver
            onResize={() => {
                renderToPage();
            }}
        >
            <div
                className={clsx(resumeStyles['resume-container'])}
                style={{
                    ...({
                        '--resume-page-width': size.width + 'px',
                        '--resume-page-height': size.height + 'px',
                        '--resume-page-padding': paddingA4 + 'px',
                    } as any),
                }}
            >
                <div className={clsx(resumeStyles['resume-toolkits'])}>
                    <div className={clsx(resumeStyles['resume-toolkits—inner'])}>
                        <Space>
                            <Radio.Group
                                options={resumePageTypeOptions}
                                onChange={e => {
                                    const type = e.target.value as ResumePageType;
                                    setResumePageType(type);
                                }}
                                optionType="button"
                                value={resumePageType}
                            />
                            <Button
                                loading={downloadPDF}
                                onClick={() => {
                                    setDownloadPDF(true);
                                    Promise.resolve()
                                        .then(() =>
                                            resumePageType === ResumePageType.SinglePage
                                                ? downloadPDFSinglePage(resumeRef.current)
                                                : downloadPDFMultiPage(resumeRef.current)
                                        )
                                        .finally(() => {
                                            setDownloadPDF(false);
                                        });
                                }}
                            >
                                下载PDF
                            </Button>
                        </Space>
                    </div>
                </div>
                <div
                    className={clsx(resumeStyles['resume'], templateStyles[templateStyle])}
                    ref={resumeRef}
                />
            </div>
        </ResizeObserver>
    );
}
