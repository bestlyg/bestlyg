import path from 'node:path';
import { expect, test as base, type TestInfo } from '@playwright/test';
import { logE2ESpec, logE2EStep, logE2ETest } from '../helpers/action-log';

type StepFunction = typeof base.step;
type TestWithStep = {
    beforeEach: typeof base.beforeEach;
    step: StepFunction;
};

const E2E_LOGGER_ATTACHED = Symbol.for('bestlyg.e2e.loggerAttached');
const loggedSpecFiles = new Set<string>();
const loggedTestRuns = new Set<string>();

function formatSpecFile(file: string) {
    return path.relative(process.cwd(), file) || file;
}

function formatTestTitle(testInfo: TestInfo) {
    return testInfo.titlePath.filter(Boolean).join(' › ');
}

function formatTestRunKey(testInfo: TestInfo) {
    return [testInfo.workerIndex, testInfo.retry, testInfo.file, ...testInfo.titlePath].join('\u0000');
}

export function withStepLogging<T extends TestWithStep>(testInstance: T): T {
    const decoratedTest = testInstance as T & { [E2E_LOGGER_ATTACHED]?: true };
    const decoratedStep = decoratedTest.step as StepFunction & { [E2E_LOGGER_ATTACHED]?: true };

    if (decoratedTest[E2E_LOGGER_ATTACHED] || decoratedStep[E2E_LOGGER_ATTACHED]) {
        return decoratedTest;
    }

    decoratedTest.beforeEach(async ({ page: _page }, testInfo) => {
        const specFile = formatSpecFile(testInfo.file);
        const testRunKey = formatTestRunKey(testInfo);

        if (!loggedSpecFiles.has(specFile)) {
            loggedSpecFiles.add(specFile);
            logE2ESpec(specFile);
        }

        if (!loggedTestRuns.has(testRunKey)) {
            loggedTestRuns.add(testRunKey);
            logE2ETest(formatTestTitle(testInfo));
        }
    });

    const originalStep = decoratedTest.step;
    const runOriginalStep = originalStep.bind(decoratedTest) as StepFunction;
    const loggedStep = (async (title, body, options) => {
        logE2EStep(String(title));
        return runOriginalStep(title, body, options);
    }) as StepFunction & { [E2E_LOGGER_ATTACHED]?: true };

    Object.assign(loggedStep, originalStep);
    loggedStep[E2E_LOGGER_ATTACHED] = true;
    decoratedTest.step = loggedStep;
    decoratedTest[E2E_LOGGER_ATTACHED] = true;

    return decoratedTest;
}

export const test = withStepLogging(base);
export { expect };
