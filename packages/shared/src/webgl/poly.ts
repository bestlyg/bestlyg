import { ASYNC } from '../constants';
import { Attribute, DrawTypes, Texture, Uniform } from './types';
import { Webgl } from './webgl';

export class Poly {
  /** 载入数据 */
  get source() {
    return new Float32Array(this.data);
  }
  /** 绘制上下文 */
  get context() {
    return this.instance.context;
  }
  /** 程序 */
  get program() {
    return this.instance.program;
  }
  /** 每个数据值包含的字节数 */
  private get elementBytes() {
    return this.source.BYTES_PER_ELEMENT;
  }
  /** 每个节点包含的数据数 */
  private get categorySize() {
    return this.attributes.reduce((total, attr) => total + attr.size, 0);
  }
  /** 每条源数据包含的字节数 */
  private get categoryBytes() {
    return this.categorySize * this.elementBytes;
  }
  /** 源数据数组包含的源数据数 */
  private get sourceSize() {
    return this.source.length / this.categorySize;
  }
  /** 通用属性映射 */
  get uniformMap() {
    const map: Record<string, Uniform> = {};
    for (const v of this.uniforms) map[v.name] = v;
    return map;
  }
  private _async = ASYNC;
  get async() {
    return this._async;
  }
  constructor(
    /** 程序上下文 */
    private instance: Webgl,
    /** 源数据数组 */
    public data: number[],
    /** 绘图方式 */
    private drawTypes: DrawTypes[],
    /** 顶点属性列表 */
    private attributes: Attribute[],
    /** 通用属性列表 */
    private uniforms: Uniform[],
    /** 纹理属性列表 */
    private textures: Texture[]
  ) {
    this.updateAttributes();
    this.updateUniforms();
    this.updateTextures();
  }
  /** 更新节点属性 */
  updateAttributes() {
    const { context, program, categoryBytes } = this;
    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, this.source, context.STATIC_DRAW);
    let byteIdx = 0;
    for (const { name, size } of this.attributes) {
      const attr = context.getAttribLocation(program, name);
      if (attr < 0) continue;
      context.vertexAttribPointer(
        attr,
        size,
        context.FLOAT,
        false,
        categoryBytes,
        byteIdx * this.elementBytes
      );
      context.enableVertexAttribArray(attr);
      byteIdx += size;
    }
  }
  /** 更新通用属性 */
  updateUniforms() {
    const { context, program } = this;
    for (const { name, method, data } of this.uniforms) {
      const ArrayCstr = method.includes('fv') ? Float32Array : Int32Array;
      const uni = context.getUniformLocation(program, name);
      if (uni === null) continue;
      const run = context[method] as Function;
      const params: any[] = [uni, new ArrayCstr(data)];
      if (method.includes('Matrix')) params.splice(1, 0, false);
      run.apply(context, params);
    }
  }
  /** 更新纹理 */
  updateTextures() {
    const { context, program } = this;
    const n = this.textures.length;
    const texture2D = context.TEXTURE_2D;
    this._async = Promise.all(this.textures.map(({ source }) => this.loadTexture(source))).then(
      (images: HTMLImageElement[]) => {
        for (let i = 0; i < n; i++) {
          const {
            name,
            format,
            magFilter = 'LINEAR',
            minFilter = 'NEAREST_MIPMAP_LINEAR',
            wrapS = 'REPEAT',
            wrapT = 'REPEAT',
          } = this.textures[i];
          const tex = context.getUniformLocation(program, name);
          if (tex === null) continue;
          context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, 1);
          context.activeTexture(context[`TEXTURE${i}`]);
          const texture = context.createTexture();
          context.bindTexture(texture2D, texture);
          context.texImage2D(
            texture2D,
            0,
            context[format],
            context[format],
            context.UNSIGNED_BYTE,
            images[i]
          );
          context.texParameteri(texture2D, context.TEXTURE_WRAP_S, context[wrapS]);
          context.texParameteri(texture2D, context.TEXTURE_WRAP_T, context[wrapT]);
          context.texParameteri(texture2D, context.TEXTURE_MAG_FILTER, context[magFilter]);
          if (minFilter.includes('MIPMAP')) context.generateMipmap(texture2D);
          context.texParameteri(texture2D, context.TEXTURE_MIN_FILTER, context[minFilter]);
          context.uniform1i(tex, i);
        }
        this._async = ASYNC;
      }
    );
  }
  /** 绘制 */
  draw(drawTypes = this.drawTypes) {
    const { context, sourceSize } = this;
    drawTypes.forEach(drawType => context.drawArrays(context[drawType], 0, sourceSize));
  }
  private loadTexture(source: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = source;
      image.onload = () => resolve(image);
    });
  }
}
