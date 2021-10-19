import { Size } from './types';
export class WebglProgram {
  private _canvas: HTMLCanvasElement;
  get canvas() {
    return this._canvas;
  }
  private _canvasSize: Size = [300, 150];
  get canvasSize() {
    return this._canvasSize;
  }
  set canvasSize(v: WebglProgram['_canvasSize']) {
    this._canvasSize = v;
    this._canvas.width = v[0];
    this._canvas.height = v[1];
  }
  private _context: WebGLRenderingContext;
  get context() {
    return this._context;
  }
  private _program: WebGLProgram;
  get program() {
    return this._program;
  }
  private _color: [number, number, number, number] = [0, 0, 0, 1];
  get color() {
    return this._color;
  }
  set color(color: WebglProgram['_color']) {
    this.context.clearColor(...color);
    this._color = color;
  }
  constructor({
    canvas,
    vertexShaderSource,
    fragmentShaderSource,
    color = [0, 0, 0, 1],
    canvasSize = [300, 300],
  }: {
    canvas: HTMLCanvasElement;
    vertexShaderSource: string;
    fragmentShaderSource: string;
    color?: WebglProgram['color'];
    canvasSize?: WebglProgram['canvasSize'];
  }) {
    this._canvas = canvas;
    this.canvasSize = canvasSize;
    const gl = (this._context = canvas.getContext('webgl') as WebGLRenderingContext & {
      program: WebGLProgram;
    });
    const program = (this._program = gl.createProgram()!);
    gl['program'] = program;
    this.loadShader(gl.VERTEX_SHADER, vertexShaderSource);
    this.loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.linkProgram(program);
    gl.useProgram(program);
    this.color = color;
    this.clear();
  }
  clear() {
    this.context.clear(this.context.COLOR_BUFFER_BIT);
  }
  private loadShader(type: number, source: string) {
    const { context, program } = this;
    const shader = context.createShader(type)!;
    context.shaderSource(shader, source);
    context.compileShader(shader);
    context.attachShader(program, shader);
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
}
