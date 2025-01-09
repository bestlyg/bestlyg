import vm from 'node:vm';
import _ from 'lodash';

export type FunctionModuleGlobalContext = {
    console: typeof globalThis.console;
    RegExp: typeof globalThis.RegExp;
    Buffer: typeof globalThis.Buffer;
    URL: typeof globalThis.URL;
    fetch: typeof globalThis.fetch;
    globalThis: FunctionModuleGlobalContext;
    global: FunctionModuleGlobalContext;
    window: FunctionModuleGlobalContext;
} & PromiseWithResolvers<void>;

export const defaultScriptOptions: vm.RunningScriptOptions = {
    filename: 'file',
    displayErrors: true,
    timeout: 1000 * 3,
};

export class FunctionModule {
    constructor() {}
    createScript(code: string, options: vm.RunningScriptOptions) {
        const script = new vm.Script(code, options);
        return script;
    }
    createGlobalContext(): FunctionModuleGlobalContext {
        let promise, resolve, reject;
        promise = new Promise((r, j) => {
            resolve = r;
            j = reject;
        });
        const ctx = {
            console: globalThis.console,
            RegExp: globalThis.RegExp,
            Buffer: globalThis.Buffer,
            URL: globalThis.URL,
            fetch: globalThis.fetch,
            promise,
            resolve,
            reject,
        } as any as FunctionModuleGlobalContext;
        ctx.globalThis = ctx.global = ctx.window = ctx;
        return ctx;
    }
    transpileCode(code: string): string {
        return `(async () => {${code}})()`.trim();
    }
    async compile(code: string) {
        const transpiledCode = this.transpileCode(code);
        const mergedOptions = _.merge({}, defaultScriptOptions);
        const script = this.createScript(transpiledCode, mergedOptions);
        const globalCtx = this.createGlobalContext();
        script.runInNewContext(globalCtx, mergedOptions);
        const res = await globalCtx.promise;
        return res;
    }
}
