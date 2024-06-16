import { useEffect } from 'react';
import { Resume } from '../resume';
import resumeSource from 'raw-loader!../resume.md';

export default function Root() {
    return (
        <div>
            <Resume resumeSource={resumeSource} />
        </div>
    );
}
