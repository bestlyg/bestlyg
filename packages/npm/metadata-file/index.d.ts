export type FileMeta = string | URL | { url: string };
/** Resolve an explicit module file hint, or fall back to the caller stack. */
export declare function getFilename(input?: FileMeta | number): string;
/** Resolve the dirname for an explicit module file hint, or fall back to the caller stack. */
export declare function getDirname(input?: FileMeta | number): string;
export declare const DefaultCallerIndex = 2;
