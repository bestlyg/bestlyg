import { Resume } from '../resume';
import resumeSource from 'raw-loader!../resume.md';

export default function Root() {
    return <Resume defaultResumeSource={resumeSource} />;
}
