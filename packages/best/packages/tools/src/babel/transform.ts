import { config } from './config';
import * as babel from '@babel/core';
import { merge } from 'lodash';
import { BabelConfig } from './interface';
import { print } from '../utils';

export interface TransformProps {
    content: string;
    babelConfig?: BabelConfig[];
    transformConfig?: (config: BabelConfig) => BabelConfig;
}

export function transformSync({
    content,
    babelConfig = [],
    transformConfig = v => v,
}: TransformProps) {
    try {
        return babel.transformSync(
            content,
            transformConfig(babelConfig.reduce((o, cur) => merge(o, cur), config))
        ).code;
    } catch (e) {
        print.error('Babel transform error.');
        print.error(e);
        process.exit(1);
    }
}

export function transformAsync({
    content,
    babelConfig = [],
    transformConfig = v => v,
}: TransformProps) {
    return babel
        .transformAsync(
            content,
            transformConfig(babelConfig.reduce((o, cur) => merge(o, cur), config))
        )
        .then(
            res => res.code,
            e => {
                print.error('Babel transform error.');
                print.error(e);
                process.exit(1);
            }
        );
}
