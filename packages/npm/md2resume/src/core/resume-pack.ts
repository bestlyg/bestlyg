import { MarkdownTransformer } from "./types";
import { AsyncSeriesHook } from "tapable";

export const defaultResumeGeneratorOptions: Required<ResumeGeneratorOptions> = {
  markdownTransformer: {
    renderToHTML(b) {
      return b;
    },
  },
};
export interface ResumeGeneratorOptions {
  markdownTransformer: MarkdownTransformer;
}
export class ResumeGenerator {
  private _markdownTransformer: MarkdownTransformer;
  get markdownTransformer() {
    return this._markdownTransformer;
  }
  private _hooks = {
    beforeMarkdowntransform: new AsyncSeriesHook(),
  };
  get hooks() {
    return this._hooks;
  }
  constructor(options: ResumeGeneratorOptions) {
    const mergedOptions: Required<ResumeGeneratorOptions> = Object.assign(
      {},
      defaultResumeGeneratorOptions,
      options
    );
    this._markdownTransformer = mergedOptions.markdownTransformer;
  }
}
