import { config } from './config';
import { CleanCSSConfig } from './interface';
import { error } from '../../utils';
import _ from 'lodash';
import cleanCSS from 'clean-css';

export interface TransformProps {
    content: string;
    transformConfig?: (config: CleanCSSConfig) => CleanCSSConfig;
}

export function transform({
    content,
    transformConfig = v => v,
}: TransformProps): Promise<cleanCSS.Output> {
    return new cleanCSS(transformConfig(_.cloneDeep(config))).minify(content).catch(err => {
        error('Less transform error.', err);
    });
}
