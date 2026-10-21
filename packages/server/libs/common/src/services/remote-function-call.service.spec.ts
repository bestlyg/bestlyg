import vm from 'node:vm';
import { afterEach, beforeEach, describe, expect, it, rs } from '@rstest/core';
import { Logger } from '@nestjs/common';
import { RemoteFunctionCall } from './remote-function-call.service';

describe('TypeScript transformation for remote functions', () => {
    beforeEach(() => {
        rs.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        rs.restoreAllMocks();
    });

    it('executes annotations, enums, parameter properties and async code', async () => {
        const remote = new RemoteFunctionCall();
        const script = new vm.Script(
            remote.transpileCode(`
                interface Input { value: number }
                enum Multiplier { Double = 2 }
                class Value {
                    constructor(public input: Input) {}
                    calculate(): number { return this.input.value * Multiplier.Double; }
                }
                const value = new Value({ value: await Promise.resolve(21) });
                return value.calculate();
            `),
        );
        expect(await script.runInNewContext()).toBe(42);
    });

    it('preserves decorator support', async () => {
        const script = new vm.Script(
            new RemoteFunctionCall().transpileCode(`
                function tagged(value: any) { value.flag = 42; }
                @tagged class Value {}
                return (Value as any).flag;
            `),
        );
        expect(await script.runInNewContext()).toBe(42);
    });

    it('rejects invalid TypeScript before execution', () => {
        expect(
            () => new vm.Script(new RemoteFunctionCall().transpileCode('const value: = ;')),
        ).toThrow();
    });
});
