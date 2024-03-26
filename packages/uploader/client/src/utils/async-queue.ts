type AsyncFunction = (...args: any[]) => Promise<any>;
export class AsyncQueue {
    start = false;
    current = 0;
    queue: AsyncFunction[] = [];
    constructor(public size: number) {}
    push(fn: AsyncFunction) {
        this.queue.push(fn);
        this.run();
    }
    run() {
        if (this.current < this.size || !this.start) {
            this.start = true;
            this.current++;
            const fn = this.queue.shift()!;
            fn?.()
                .catch(err => {
                    console.log(`ERROR: ${err}`);
                })
                .finally(() => {
                    if (--this.current === 0) this.start = false;
                    this.run();
                });
        }
    }
}
