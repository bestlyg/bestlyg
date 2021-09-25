export class Webgl {
  private _canvas: HTMLCanvasElement;
  get canvas() {
    return this._canvas;
  }
  private _canvasSize: [number, number] = [300, 150];
  get canvasSize() {
    return this._canvasSize;
  }
  set canvasSize(v: Webgl['_canvasSize']) {
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
  set color(color: Webgl['_color']) {
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
    color?: Webgl['color'];
    canvasSize?: Webgl['canvasSize'];
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
}
