import fs from 'node:fs/promises';
import path from 'node:path';
import { expect, test as base } from '@rstest/playwright';
import { logE2ESpec, logE2EStep, logE2ETest } from '../helpers/action-log';
import { PACKAGE_ROOT } from '../../src/paths';

const loggedSpecFiles = new Set<string>();
base.beforeEach(async ({ page, task, onTestFailed }) => {
    const specFile = task.filepath ? path.relative(PACKAGE_ROOT, task.filepath) : '';
    if (!loggedSpecFiles.has(specFile)) {
        loggedSpecFiles.add(specFile);
        logE2ESpec(specFile);
    }
    logE2ETest(task.name);
    onTestFailed(async () => {
        const directory = path.join(PACKAGE_ROOT, 'test-results', task.id);
        await fs.mkdir(directory, { recursive: true });
        await page.screenshot({ path: path.join(directory, 'failure.png'), fullPage: true });
    });
});

export const test = base;
export { expect };
export async function step<T>(title: string, body: () => Promise<T>) {
    logE2EStep(title);
    return body();
}
