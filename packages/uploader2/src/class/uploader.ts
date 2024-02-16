import EventEmitter from 'events';
import PQueue from 'p-queue';

export interface UploaderOptions {
    pQueueOptions?: ConstructorParameters<typeof PQueue>;
}
export const defaultUploaderOptions: UploaderOptions = { pQueueOptions: [{ concurrency: 5 }] };

export class Uploader extends EventEmitter {
    queue: InstanceType<typeof PQueue>;
    constructor(config?: UploaderOptions) {
        super();
        config = Object.assign({}, defaultUploaderOptions, config);
        this.queue = new PQueue(
            ...(config.pQueueOptions as NonNullable<UploaderOptions['pQueueOptions']>)
        );
    }
}
