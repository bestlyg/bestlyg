import { Resume } from './resume';
import { Suspense, useState, use } from 'react';

async function fetchResume() {
    const res = await fetch('/static/resume.md');
    const data = await res.text();
    return data;
}

function ResumeWrapper({ promise }: { promise: Promise<string> }) {
    const data = use(promise);
    return <Resume defaultResumeSource={data} />;
}

export default function App() {
    const [promise] = useState(() => fetchResume());
    return (
        <Suspense fallback={'loading'}>
            <ResumeWrapper promise={promise} />
        </Suspense>
    );
}
