import { packageTestConfig } from '../../scripts/rstest-config';

export default packageTestConfig('server-dist', import.meta.url, {
    include: ['test/dist.test.ts'],
    testTimeout: 60_000,
});
