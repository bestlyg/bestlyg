import { UploaderOptions } from './class/index';

export const defaultUploaderOptions: UploaderOptions = {
    plugins: [],
    queueOptions: [{ concurrency: 1, autoStart: false }],
};

export * from './class/index';
export * from './utils/index';
