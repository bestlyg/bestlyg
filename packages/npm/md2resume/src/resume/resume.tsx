import { ResumeGenerator } from '../core/resume-generator';
import { Button, Radio, Space } from 'antd';
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
    }, []);
    useLayoutEffect(() => {
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
                    count === 1 ? heightA4 - paddingA4 : heightA4 - 2 * paddingA4,
            });
        }
    }, [resumePageType, html]);
    return (
        <div
            className={clsx(resumeStyles['resume-container'])}
            style={{
                ...({
                    '--resume-page-width': widthA4 + 'px',
                    '--resume-page-height': heightA4 + 'px',
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
                            onClick={() => {
                                if (resumePageType === ResumePageType.SinglePage) {
                                    downloadPDFSinglePage(resumeRef.current);
                                } else {
                                    downloadPDFMultiPage(resumeRef.current);
                                }
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
    );
}
