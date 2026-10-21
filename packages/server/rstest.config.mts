import { packageTestConfig } from '../../scripts/rstest-config';

export default packageTestConfig('server', import.meta.url, {
    ...(process.env.RSTEST_DEBUG
        ? { pool: { type: 'forks' as const, maxWorkers: 1, execArgv: ['--inspect-brk=9230'] } }
        : {}),
    include: ['src/**/*.spec.ts', 'libs/**/*.spec.ts'],
    coverage: { provider: 'v8', include: ['src/**/*.ts', 'libs/**/*.ts'] },
});
