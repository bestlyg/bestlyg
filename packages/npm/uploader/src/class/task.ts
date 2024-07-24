export class Task {
    constructor(public blob: Blob) {}
    run(): Promise<void> {
        return Promise.resolve();
    }
}
