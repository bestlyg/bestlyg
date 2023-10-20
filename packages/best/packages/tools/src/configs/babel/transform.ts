import { config } from './config';
import * as babel from '@babel/core';
import { BabelConfig } from './interface';
import { error } from '../../utils';
import _ from 'lodash';

export interface TransformProps {
    content: string;
    transformConfig?: (config: BabelConfig) => BabelConfig;
}

// export function transformSync({ content, transformConfig = v => v }: TransformProps) {
//     try {
//         return babel.transformSync(content, transformConfig(config)).code;
//     } catch (e) {
//         print.error('Babel transform error.');
//         print.error(e);
//         process.exit(1);
//     }
// }

export function transform({ content, transformConfig = v => v }: TransformProps): Promise<string> {
    return babel.transformAsync(content, transformConfig(_.cloneDeep(config))).then(
        res => res.code,
        err => error('Babel transform error.', err)
    );
}
