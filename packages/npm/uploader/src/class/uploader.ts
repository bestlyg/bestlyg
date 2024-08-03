import tapable from 'tapable';
import R from 'ramda';
import { Task } from './task';
import PQueue from 'p-queue';
import { Transporter, TransporterManager } from './transporter';

export interface UploaderPlugin {
    apply: (uploader: Uploader) => void;
}

export interface UploaderOptions {
    transporterManager?: TransporterManager;
    plugins?: UploaderPlugin[];
    queueOptions?: ConstructorParameters<typeof PQueue>;
}

export type AddTaskOption = Parameters<PQueue['add']>[1];

export class Uploader {
    hooks = {
        beforeAddTask: new tapable.AsyncSeriesWaterfallHook<[Task, AddTaskOption]>([
            'task',
            'options',
        ]),
        afterAddTask: new tapable.AsyncParallelHook<[Task, AddTaskOption]>(['task', 'options']),
        beforeRunTask: new tapable.AsyncSeriesWaterfallHook<[boolean]>(['canStart']),
        afterRunTask: new tapable.AsyncParallelHook<[boolean]>(['canStart']),
        beforePauseTask: new tapable.AsyncSeriesWaterfallHook<[boolean]>(['canPause']),
        afterPauseTask: new tapable.AsyncParallelHook<[boolean]>(['canPause']),
        beforeClearTask: new tapable.AsyncSeriesWaterfallHook<[boolean]>(['canClear']),
        afterClearTask: new tapable.AsyncParallelHook<[boolean]>(['canClear']),
    };
    transporterManager: TransporterManager;
    tasks: PQueue;
    options: UploaderOptions;
    constructor(options: UploaderOptions) {
        this.options = options;
        this.tasks = new PQueue(...options.queueOptions);
        this.transporterManager = options.transporterManager ?? new TransporterManager(Transporter);
        options.plugins?.forEach(plugin => {
            plugin.apply(this);
        });
    }
    use(plugin: UploaderPlugin) {
        plugin.apply(this);
        return this;
    }
    setOptions(options: UploaderOptions) {
        this.options = options;
        return this;
    }
    mergeOptions(options: UploaderOptions) {
        this.options = R.mergeDeepRight(this.options, options) as UploaderOptions;
        return this;
    }
    async addTask(task: Task, options?: AddTaskOption) {
        task = await this.hooks.beforeAddTask.promise(task, options);
        this.tasks.add(() => task.run(), options);
        await this.hooks.afterAddTask.promise(task, options);
    }
    async runTask() {
        const canStart = await this.hooks.beforeRunTask.promise(true);
        if (canStart) this.tasks.start();
        await this.hooks.afterRunTask.promise(canStart);
    }
    async pauseTask() {
        const canPause = await this.hooks.beforePauseTask.promise(true);
        if (canPause) this.tasks.pause();
        await this.hooks.afterPauseTask.promise(canPause);
    }
    async clearTask() {
        const canClear = await this.hooks.beforeClearTask.promise(true);
        if (canClear) this.tasks.clear();
        await this.hooks.afterClearTask.promise(canClear);
    }
    async createTask(blob: Blob) {
        return Promise.resolve(new Task(blob));
    }
    async createTasks(blob: Blob[]) {
        return Promise.all(blob.map(blob => this.createTask(blob)));
    }
    async addBlob(...blobs: Blob[]) {
        const tasks = await Promise.all(blobs.map(blob => this.createTask(blob)));
        for (const task of tasks) {
            await this.addTask(task);
        }
    }
}
