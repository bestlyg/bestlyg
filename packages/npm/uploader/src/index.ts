import { UploaderOptions } from './class/index';
import { StoreUploaderPlugin } from './plugins/index';

export const defaultUploaderOptions: UploaderOptions = {
    plugins: [new StoreUploaderPlugin()],
    queueOptions: [{ concurrency: 1, autoStart: false }],
};

export * from './class/index';
export * from './utils/index';
