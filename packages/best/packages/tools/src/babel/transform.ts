import { config } from './config';
import * as babel from '@babel/core';
import { BabelConfig } from './interface';
import { print } from '../utils';

export interface TransformProps {
    content: string;
    transformConfig?: (config: BabelConfig) => BabelConfig;
}

export function transformSync({ content, transformConfig = v => v }: TransformProps) {
    try {
        return babel.transformSync(content, transformConfig(config)).code;
    } catch (e) {
        print.error('Babel transform error.');
        print.error(e);
        process.exit(1);
    }
}

export function transformAsync({ content, transformConfig = v => v }: TransformProps) {
    return babel.transformAsync(content, transformConfig(config)).then(
        res => res.code,
        e => {
            print.error('Babel transform error.');
            print.error(e);
            process.exit(1);
        }
    );
}
