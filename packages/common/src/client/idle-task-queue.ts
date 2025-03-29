export type IdleTask = () => Promise<any>;

export class IdleTaskQueue {
    running = false;
    queue: IdleTask[] = [];
    addTask(task: IdleTask) {
        this.queue.push(task);
    }
    addTaskAndRun(task: IdleTask) {
        this.addTask(task);
        this.run();
    }
    async run(force = false) {
        if (this.running && !force) return;
        this.running = true;
        const task = this.queue.shift();
        if (!task) {
            this.running = false;
        } else {
            requestIdleCallback(() => {
                // 一个个执行，每次执行完都重新判断空闲
                task().finally(() => {
                    this.run(true);
                });
            });
        }
    }
}
