import { config } from './config';
import { LessConfig } from './interface';
import less from 'less';
import { error } from '../../utils';

export interface TransformProps {
    content: string;
    transformConfig?: (config: LessConfig) => LessConfig;
}

export function transform({
    content,
    transformConfig = v => v,
}: TransformProps): Promise<Less.RenderOutput> {
    return less.render(content, transformConfig(config)).catch(err => {
        error('Less transform error.', err);
    });
}
