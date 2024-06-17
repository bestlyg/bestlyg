import { ResumeGenerator } from '../core/resume-generator';
import { Radio } from 'antd';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import templateStyles from './template.module.less';
import resumeStyles from './resume.module.less';
import clsx from 'clsx';
import {
    ResumePageType,
    renderToMultiPage,
    renderToSignlePage,
    resumePageTypeOptions,
} from './utils';

export interface ResumeProps {
    resumeSource: string;
}

export function Resume(props: ResumeProps) {
    const [resumePageType, setResumePageType] = useState(ResumePageType.SinglePage);
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
            setHTML(html);
            if (resumeRef.current) resumeRef.current.innerHTML = html;
        }
        run();
    }, []);
    useLayoutEffect(() => {
        if (!resumeRef.current) return;
        if (resumePageType === ResumePageType.SinglePage) {
            resumeRef.current.innerHTML = html;
            renderToSignlePage({
                container: resumeRef.current,
                html,
            });
        } else if (resumePageType === ResumePageType.MultiPage) {
            renderToMultiPage({
                container: resumeRef.current,
                pageHeight: 1123,
            });
        }
    }, [resumePageType]);
    return (
        <div className={clsx(resumeStyles['resume-container'])}>
            <div className={clsx(resumeStyles['resume-toolkits'])}>
                <div className={clsx(resumeStyles['resume-toolkits—inner'])}>
                    <Radio.Group
                        options={resumePageTypeOptions}
                        onChange={e => {
                            const type = e.target.value as ResumePageType;
                            setResumePageType(type);
                        }}
                        optionType="button"
                        value={resumePageType}
                    />
                </div>
            </div>
            <div
                className={clsx(resumeStyles['resume'], templateStyles[templateStyle])}
                ref={resumeRef}
            />
        </div>
    );
}
