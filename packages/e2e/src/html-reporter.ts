import fs from 'node:fs/promises';
import path from 'node:path';
import type { Reporter } from '@rstest/core';
import { PACKAGE_ROOT } from './paths';

const escape = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (character) =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
    );

export class HtmlReporter implements Reporter {
    flushOutputStreams = false;
    onTestRunEnd: NonNullable<Reporter['onTestRunEnd']> = async ({
        summary,
        testResults,
        unhandledErrors,
    }) => {
        const directory = path.join(PACKAGE_ROOT, 'rstest-report');
        await fs.mkdir(directory, { recursive: true });
        const rows = testResults
            .map(
                (result) =>
                    `<tr><td>${escape(result.project)}</td><td>${escape([...(result.parentNames ?? []), result.name].join(' › '))}</td><td>${result.status}</td><td>${result.duration ?? 0} ms</td></tr>`,
            )
            .join('');
        const errors = [
            ...testResults.flatMap((result) => result.errors ?? []),
            ...unhandledErrors,
        ];
        await fs.writeFile(
            path.join(directory, 'index.html'),
            `<!doctype html><html lang="en"><meta charset="utf-8"><title>Rstest report</title><style>body{font:16px system-ui;margin:2rem}td,th{padding:.5rem;text-align:left;border-bottom:1px solid #ddd}pre{white-space:pre-wrap}</style><h1>Rstest report</h1><pre>${escape(JSON.stringify(summary, null, 2))}</pre><table><thead><tr><th>Project</th><th>Test</th><th>Status</th><th>Duration</th></tr></thead><tbody>${rows}</tbody></table><h2>Errors</h2><pre>${escape(JSON.stringify(errors, null, 2))}</pre><p>Failure screenshots and browser traces: <a href="../test-results/">test-results</a></p></html>`,
        );
    };
}
