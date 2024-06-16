import { ResumeGenerator } from '../core/resume-generator';
import { useEffect, useRef, useState } from 'react';
import templateStyles from './template.module.less';
import resumeStyles from './resume.module.less';
import clsx from 'clsx';

export interface ResumeProps {
    resumeSource: string;
}
export function Resume(props: ResumeProps) {
    const { resumeSource } = props;
    const resumeGeneratorRef = useRef<ResumeGenerator>();
    const [resumeHTML, setResumeHTML] = useState('');
    const [templateStyle, setTemplateStyle] = useState('');
    useEffect(() => {
        // console.log('===>', templateStyles);
        async function run() {
            const resumeGenerator = (resumeGeneratorRef.current = new ResumeGenerator());
            await resumeGenerator.registerTemplate('resume-template1', () => {
                setTemplateStyle('resume-template1');
                return Promise.resolve();
            });
            await resumeGenerator.loadTemplate('resume-template1');
            const html = await resumeGenerator.renderToHTML(resumeSource);
            setResumeHTML(html);
        }
        run();
    }, []);
    return (
        <div className={clsx(resumeStyles['resume-container'])}>
            <div
                className={clsx(resumeStyles['resume'], templateStyles[templateStyle])}
                dangerouslySetInnerHTML={{ __html: resumeHTML }}
            />
        </div>
    );
}
