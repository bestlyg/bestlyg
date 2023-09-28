export interface BabelConfig {
    filename: string;
    presets: Array<any>;
    plugins: Array<string | Function>;
    configFile: boolean;
}
