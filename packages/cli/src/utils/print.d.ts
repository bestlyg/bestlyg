import chalk from 'chalk';
declare function log(...args: any[]): void;
declare function _print(color: any, ...args: any[]): void;
declare function list(info: Record<string, any>): void;
/**
 * Print divider
 * @param {'info' | 'warn' | 'success' | 'error'} level
 */
declare function divider(level?: string): void;
declare function errorWithStack(msg: string, ...errors: any[]): void;
export declare const print: typeof _print & {
    info: typeof _print;
    warn: typeof _print;
    error: typeof _print;
    success: typeof _print;
    log: typeof log;
    chalk: chalk.Chalk & chalk.ChalkFunction & {
        supportsColor: false | chalk.ColorSupport;
        Level: chalk.Level;
        Color: ("gray" | "yellow" | "red" | "green" | "black" | "blue" | "magenta" | "cyan" | "white" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright") | ("bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright");
        ForegroundColor: "gray" | "yellow" | "red" | "green" | "black" | "blue" | "magenta" | "cyan" | "white" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright";
        BackgroundColor: "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
        Modifiers: "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough" | "visible";
        stderr: chalk.Chalk & {
            supportsColor: false | chalk.ColorSupport;
        };
    };
    divider: typeof divider;
    list: typeof list;
    errorWithStack: typeof errorWithStack;
};
export {};
