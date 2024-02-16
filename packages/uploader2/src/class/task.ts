import EventEmitter from 'events';
import pLimit from 'p-limit';

export interface TaskConfig {}
export const defaultTaskConfig: TaskConfig = {};
export interface TaskLike {
    execFn: () => void | null;
}
export class Task extends EventEmitter implements TaskLike {
    constructor(config?: TaskConfig) {
        super();
        config = Object.assign({}, defaultTaskConfig, config);
    }
}

export interface TaskPoolConfig {
    poolParams?: Parameters<typeof pLimit>;
}
export const defaultTaskPoolConfig: TaskPoolConfig = {
    poolParams: [5],
};
export interface TaskPoolLike {
    addTask: (task: TaskLike) => void;
    removeTask: (task: TaskLike) => void;
}
export class TaskPool extends EventEmitter implements TaskPoolLike {
    pLimit: ReturnType<typeof pLimit>;
    list: Function[] = [];
    constructor(config?: TaskPoolConfig) {
        super();
        config = Object.assign({}, defaultTaskPoolConfig, config);
        this.pLimit = pLimit(
            ...((config.poolParams ?? []) as NonNullable<TaskPoolConfig['poolParams']>)
        );
    }
    addTask(task: TaskLike) {
        const execFn = () => {
            console.log('run task', task);
        };
        this.list.push(execFn);
        this.pLimit(execFn);
    }
}
