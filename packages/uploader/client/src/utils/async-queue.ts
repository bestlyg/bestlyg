type AsyncFunction = (...args: any[]) => Promise<any>;
export class AsyncQueue {
    start = false;
    current = 0;
    queue: AsyncFunction[] = [];
    constructor(public size: number) {}
    push(fn: AsyncFunction) {
        this.queue.push(fn);
    }
    run(init = true): Promise<void> {
        if (init) this.start = true;
        if (!this.queue.length) return Promise.resolve();
        if (this.current < this.size) {
            this.start = true;
            this.current++;
            const fn = this.queue.shift()!;
            return (
                fn?.().then(
                    () => {
                        if (--this.current === 0) {
                            this.start = false;
                        }
                        return this.run();
                    },
                    err => {
                        console.log(`ERROR: `, err);
                    }
                ) ?? Promise.resolve()
            );
        }
        return Promise.resolve();
    }
}
