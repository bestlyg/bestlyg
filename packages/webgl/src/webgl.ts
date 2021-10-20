import { Size } from './types';

export class Webgl {
  private _canvas: HTMLCanvasElement;
  get canvas() {
    return this._canvas;
  }
  private _context: WebGLRenderingContext;
  get context() {
    return this._context;
  }
  private _color: [number, number, number, number];
  get color() {
    return this._color;
  }
  set color(color: Webgl['_color']) {
    this.context.clearColor(...color);
    this._color = color;
  }
  private _canvasSize: Size;
  get canvasSize() {
    return this._canvasSize;
  }
  set canvasSize(size: Size) {
    this._canvasSize = size;
    [this.canvas.width, this.canvas.height] = size;
  }
  constructor({ canvas, size = [300, 300] }: { canvas: Webgl['canvas']; size: Size }) {
    this._canvas = canvas;
    this.canvasSize = size;
    this._context = canvas.getContext('webgl')!;
    this.color = [0, 0, 0, 1];
  }
  transformPosition({ client }: { client: Size }): {
    css: Size;
    webgl: Size;
  };
  transformPosition({ css }: { css: Size }): {
    css: Size;
    webgl: Size;
  };
  transformPosition({ webgl }: { webgl: Size }): {
    css: Size;
    webgl: Size;
  };
  transformPosition({ client, css, webgl }: { client?: Size; css?: Size; webgl?: Size }): {
    css: Size;
    webgl: Size;
  } {
    const ans: {
      css: Size;
      webgl: Size;
    } = { css: [0, 0], webgl: [0, 0] };
    if (client) {
      const { top, left } = this.canvas.getBoundingClientRect();
      const [clientX, clientY] = client;
      ans.css = [clientX - left, clientY - top];
      ans.webgl = this.css2WebglPosition(ans.css);
    } else if (css) {
      ans.css = css;
      ans.webgl = this.css2WebglPosition(css);
    } else if (webgl) {
      ans.css = this.webgl2CssPosition(webgl);
      ans.webgl = webgl;
    }
    return ans;
  }
  private css2WebglPosition([x, y]: Size): Size {
    const [width, height] = this.canvasSize.map(v => v / 2) as Size;
    return [(x - width) / width, -(y - height) / height];
  }
  private webgl2CssPosition([x, y]: Size): Size {
    const [width, height] = this.canvasSize.map(v => v / 2) as Size;
    return [x * width + width, -y * height + height];
  }
  clear() {
    this.context.clear(this.context.COLOR_BUFFER_BIT);
  }
  createProgram(vertexShaderSource: string, fragmentShaderSource: string) {
    const { context } = this;
    const program = context.createProgram()!;
    this.loadShader(program, context.VERTEX_SHADER, vertexShaderSource);
    this.loadShader(program, context.FRAGMENT_SHADER, fragmentShaderSource);
    context.linkProgram(program);
    return program;
  }
  private loadShader(program: WebGLProgram, type: number, source: string) {
    const { context } = this;
    const shader = context.createShader(type)!;
    context.shaderSource(shader, source);
    context.compileShader(shader);
    context.attachShader(program, shader);
  }
  loadTexture(source: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = source;
      image.onload = () => resolve(image);
      image.onerror = err => reject(err);
    });
  }
}
