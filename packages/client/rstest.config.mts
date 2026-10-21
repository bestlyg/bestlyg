import { packageTestConfig } from '../../scripts/rstest-config';

export default packageTestConfig('client-unit', import.meta.url, {
    include: ['scripts/**/*.test.ts', 'test/**/*.test.ts'],
});
