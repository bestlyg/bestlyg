import vm from 'node:vm';
import ts from 'typescript';
import _ from 'lodash';
import { Request, Response } from 'express';
import { Injectable, Logger } from '@nestjs/common';

export type FunctionModuleGlobalContext = {
    console: typeof globalThis.console;
    RegExp: typeof globalThis.RegExp;
    Buffer: typeof globalThis.Buffer;
    URL: typeof globalThis.URL;
    fetch: typeof globalThis.fetch;
    globalThis: FunctionModuleGlobalContext;
    global: FunctionModuleGlobalContext;
    window: FunctionModuleGlobalContext;

    name: string;
    query: Record<string, any>;
    body: any;
    headers: Record<string, any>;

    req: Request;
    res: Response;
} & PromiseWithResolvers<void>;

export const defaultScriptOptions: vm.RunningScriptOptions = {
    filename: 'file',
    displayErrors: true,
    timeout: 1000 * 3,
};

export class FunctionModule {
    private readonly logger = new Logger(FunctionModule.name);
    constructor() {}
    createScript(code: string, options: vm.RunningScriptOptions) {
        const script = new vm.Script(code, options);
        return script;
    }
    createGlobalContext(
        externalGlobalCtx: Partial<FunctionModuleGlobalContext>,
    ): FunctionModuleGlobalContext {
        let promise, resolve, reject;
        promise = new Promise((r, j) => {
            resolve = r;
            reject = j;
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
            setTimeout,
            ...externalGlobalCtx,
        } as any as FunctionModuleGlobalContext;
        ctx.globalThis = ctx.global = ctx.window = ctx;
        return ctx;
    }
    transpileCode(code: string): string {
        code = `(async () => {${code}})()`.trim();
        const transpiledCode = ts.transpile(code, {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022,
            removeComments: true,
            inlineSourceMap: true,
        });
        this.logger.log(`\n${transpiledCode}\n`);
        return transpiledCode;
    }
    async compile(code: string, externalGlobalCtx: Partial<FunctionModuleGlobalContext>) {
        const transpiledCode = this.transpileCode(code);
        const mergedOptions = _.merge({}, defaultScriptOptions);
        const script = this.createScript(transpiledCode, mergedOptions);
        const globalCtx = this.createGlobalContext(externalGlobalCtx);
        script.runInNewContext(globalCtx, mergedOptions);
        const res = await Promise.race([
            globalCtx.promise,
            new Promise<void>((_, reject) => {
                setTimeout(() => {
                    reject(new Error('Async Script execution timed out after 3000ms'));
                }, 1000 * 3);
            }),
        ]);
        return res;
    }
}

@Injectable()
export class FunctionModuleService {
    async compile(...args: Parameters<InstanceType<typeof FunctionModule>['compile']>) {
        const module = new FunctionModule();
        const res = await module.compile(...args);
        return res;
    }
}
