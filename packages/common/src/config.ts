export const TYPE_SEPARATOR = '@';
export const CONFIG_KEY_SEPARATOR = ':';

export abstract class AbstractConfig<T = ConfigValueType> {
    constructor(
        public label: string,
        public desc: string,
        public defaultValue: T,
    ) {}
    abstract parse(v: string): T;
    abstract stringify(v: T): string;
    abstract type: string;
    merge(...list: T[]): T {
        return list?.[0] ?? this.defaultValue;
    }
}

export class BooleanConfig extends AbstractConfig<boolean> {
    static assert(v: AbstractConfig<boolean>): v is BooleanConfig {
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
    merge(...list: boolean[]): boolean {
        return list.some(Boolean);
    }
}

export class StringConfig extends AbstractConfig<string> {
    static assert(v: AbstractConfig<string>): v is StringConfig {
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

export class RadioConfig<T extends string = ''> extends AbstractConfig<T> {
    static assert(v: AbstractConfig<string>): v is RadioConfig<any> {
        return v.type === 'radio';
    }
    type = 'radio';
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<T>['defaultValue'],
        public config: {
            options: {
                label: string;
                value: T;
            }[];
        },
    ) {
        super(label, desc, defaultValue);
    }
    parse(v: string): T {
        const val = v as T;
        if (this.config.options.every(v => v.value !== val)) return this.defaultValue;
        return val;
    }
    stringify(v: T): string {
        return v;
    }
}

export class NumberConfig extends AbstractConfig<number> {
    static assert(v: AbstractConfig<number>): v is NumberConfig {
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
    static assert(v: AbstractConfig<string[]>): v is StringListConfig {
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
        return v.split(this.separator).filter(Boolean);
    }
    stringify(v: string[]): string {
        return v.join(this.separator);
    }
}

export type ExtractConfigType<C extends AbstractConfig<any>> =
    C extends AbstractConfig<infer R> ? R : never;

export type ConfigValueType =
    | ExtractConfigType<StringConfig>
    | ExtractConfigType<BooleanConfig>
    | ExtractConfigType<NumberConfig>
    | ExtractConfigType<StringListConfig>
    | ExtractConfigType<RadioConfig>;

export const commonFactory = {
    StringConfig,
    BooleanConfig,
    NumberConfig,
    StringListConfig,
    RadioConfig,
} as const;

export type ConfigFactory = typeof commonFactory;

export type ExtractConfigInfo<O extends Record<string, AbstractConfig<any>>> = {
    [K in keyof O]: ExtractConfigType<O[K]>;
};
