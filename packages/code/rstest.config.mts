import { packageTestConfig } from '../../scripts/rstest-config';

export default packageTestConfig('code', import.meta.url, {
    output: { bundleDependencies: ['lodash'] },
});
