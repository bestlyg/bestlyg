import ts from 'typescript';
import { TsConfig } from './interface';
import { config } from './config';

export interface TransformProps {
    content: string;
    transformConfig?: (config: TsConfig) => TsConfig;
}

export function transformSync({ content, transformConfig }: TransformProps) {
    return ts.transpile(content, transformConfig?.(config) ?? config);
}
