export declare function tryToNumber(s: string, defaultValue: number): number;
export declare function getEnv(s: string): string;
export declare function resolve(...p: string[]): string;
export declare function mount<O, T>(base: O, mountRecord: T): O & T;
