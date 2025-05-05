export const TYPE_SEPARATOR = '@';
export const CONFIG_KEY_SEPARATOR = ':';

export abstract class AbstractConfig<T = any> {
    constructor(
        public label: string,
        public desc: string,
        public defaultValue: T,
    ) {}
    abstract parse(v: string): T;
    abstract stringify(v: T): string;
    abstract type: string;
    // abstract render(): React.ReactNode
    // abstract Component: React.FC
}

export class BooleanConfig extends AbstractConfig<boolean> {
    static assert(v: AbstractConfig<any>): v is BooleanConfig {
        return v.type === 'boolean';
    }
    type = 'boolean';
    parse(v: string): boolean {
        if (v === 'true') return true;
        if (v === 'false') return false;
        return this.defaultValue;
    }
    stringify(v: boolean): string {
        return v.toString();
    }
}

export class StringConfig extends AbstractConfig<string> {
    static assert(v: AbstractConfig<any>): v is StringConfig {
        return v.type === 'string';
    }
    type = 'string';
    parse(v: string): string {
        return v;
    }
    stringify(v: string): string {
        return v;
    }
}

export class NumberConfig extends AbstractConfig<number> {
    static assert(v: AbstractConfig<any>): v is NumberConfig {
        return v.type === 'number';
    }
    type = 'number';
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<number>['defaultValue'],
        public min: number | undefined,
        public max: number | undefined,
        public decimals: number | undefined,
    ) {
        super(label, desc, defaultValue);
    }
    parse(v: string): number {
        const num = Number(v);
        if (Number.isNaN(num)) return this.defaultValue;
        return num;
    }
    stringify(v: number): string {
        return v.toString();
    }
}

export class StringListConfig extends AbstractConfig<string[]> {
    static assert(v: AbstractConfig<any>): v is StringListConfig {
        return v.type === 'string-list';
    }
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<string[]>['defaultValue'],
        public separator: string,
    ) {
        super(label, desc, defaultValue);
    }
    type = 'string-list';
    parse(v: string): string[] {
        return v.split(this.separator);
    }
    stringify(v: string[]): string {
        return v.join(this.separator);
    }
}

export const CONFIG_LIST = [BooleanConfig, StringConfig, NumberConfig, StringListConfig] as const;

export type ConfigValueType = InstanceType<(typeof CONFIG_LIST)[number]>['defaultValue'];
