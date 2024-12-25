export class BaseController {
    async reject(message: string) {
        return this.of(() => Promise.reject(new Error(message)));
    }
    async of<T>(run: () => Promise<T>) {
        return run().then(
            data => {
                return {
                    code: 0,
                    data,
                };
            },
            err => {
                return {
                    code: 1,
                    msg: err?.message ?? err?.toString() ?? 'Server Error',
                };
            },
        );
    }
}
