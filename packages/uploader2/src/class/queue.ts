import EventEmitter from 'events';

export interface QueueConfig {}
export const defaultQueueConfig: QueueConfig = {};

export class Queue extends EventEmitter implements QueueLike {
    constructor(config?: QueueConfig) {
        super();
        config = Object.assign({}, defaultQueueConfig, config);
    }
    addTask() {}
}

export interface QueueLike {}
