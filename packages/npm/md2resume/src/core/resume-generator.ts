import { MarkdownTransformer, ResumeGeneratorOptions, TemplateLoadFunction } from './types';
import { AsyncSeriesWaterfallHook, SyncHook, AsyncParallelHook } from 'tapable';
import _ from 'lodash';
import { defaultResumeGeneratorOptions } from './default-options';

export class ResumeGenerator {
    private _markdownTransformer: MarkdownTransformer;
    get markdownTransformer() {
        return this._markdownTransformer;
    }
    private _hooks = {
        beforeMarkdowntransform: new AsyncSeriesWaterfallHook<string>(['source']),
        afterMarkdowntransform: new AsyncSeriesWaterfallHook<string>(['source']),

        beforeLoadTemplate: new AsyncParallelHook<[]>([]),
        afterLoadTemplate: new AsyncParallelHook<[]>([]),

        beforeRegisterTemplate: new AsyncSeriesWaterfallHook<TemplateLoadFunction>([
            'templateLoadFunction',
        ]),
        afterRegisterTemplate: new SyncHook<[string, TemplateLoadFunction]>([
            'name',
            'templateLoadFunction',
        ]),
    };
    get hooks() {
        return this._hooks;
    }
    private _templates = new Map<string, TemplateLoadFunction>();
    get templates() {
        return this._templates;
    }
    constructor(options: ResumeGeneratorOptions = {}) {
        const mergedOptions: Required<ResumeGeneratorOptions> = _.merge(
            defaultResumeGeneratorOptions,
            options,
        );
        this._markdownTransformer = mergedOptions.markdownTransformer;
    }
    async renderToHTML(source: string) {
        source = await this.hooks.afterMarkdowntransform.promise(source);
        let html = await this.markdownTransformer.renderToHTML(source);
        html = await this.hooks.afterMarkdowntransform.promise(html);
        return html;
    }
    async registerTemplate(name: string, templateLoadtFunction: TemplateLoadFunction) {
        templateLoadtFunction =
            await this.hooks.beforeRegisterTemplate.promise(templateLoadtFunction);
        this.templates.set(name, templateLoadtFunction);
        this.hooks.afterRegisterTemplate.call(name, templateLoadtFunction);
    }
    async loadTemplate(name: string) {
        const templateLoadFunction = this.templates.get(name);
        if (!templateLoadFunction) {
            throw new Error(`The ${name} template is not registered.`);
        }
        await this.hooks.beforeLoadTemplate.promise();
        await templateLoadFunction();
        await this.hooks.afterLoadTemplate.promise();
    }
    async plugin(pluginInitFunction: (resumeGenerator: ResumeGenerator) => Promise<void>) {
        await pluginInitFunction(this);
    }
}
