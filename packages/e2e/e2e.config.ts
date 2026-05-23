import { defineE2EConfig } from './src';

export default defineE2EConfig({
    playwright: {
        reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
    },
    projects: {},
});
