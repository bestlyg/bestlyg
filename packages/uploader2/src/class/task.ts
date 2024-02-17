import EventEmitter from 'events';
import pLimit from 'p-limit';

export interface TaskConfig {
    execFn: () => void;
}
export const defaultTaskConfig: Partial<TaskConfig> = {};
export class Task extends EventEmitter {
    constructor(config: TaskConfig) {
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
    addTask: (task: Task) => void;
    removeTask: (task: Task) => void;
}
export class TaskPool extends EventEmitter implements TaskPoolLike {
    pLimit: ReturnType<typeof pLimit>;
    tasks = new Set<Task>();
    constructor(config?: TaskPoolConfig) {
        super();
        config = Object.assign({}, defaultTaskPoolConfig, config);
        this.pLimit = pLimit(
            ...((config.poolParams ?? []) as NonNullable<TaskPoolConfig['poolParams']>)
        );
    }
    addTask(task: Task) {
        this.tasks.add(task);
    }
    removeTask(task: Task) {
        this.tasks.delete(task);
    }
}
