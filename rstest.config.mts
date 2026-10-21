import { defineConfig } from '@rstest/core';
import { HtmlReporter } from './packages/e2e/src/html-reporter';

export default defineConfig({
    projects: ['packages/**/rstest.config.mts', 'packages/server/rstest.dist.config.mts'],
    pool: { type: 'forks', maxWorkers: 4 },
    reporters: ['default', new HtmlReporter()],
});
