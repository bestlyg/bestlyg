import { ResumeGeneratorOptions } from './types';
import { MarkedAdapter } from './marked-adapter';

export const defaultResumeGeneratorOptions: Required<ResumeGeneratorOptions> = {
    markdownTransformer: new MarkedAdapter(),
};
