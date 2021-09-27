import { Attribute, DrawTypes, Uniform } from './types';
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
  /** 顶点属性映射 */
  get attributeMap() {
    const map: Record<string, Attribute> = {};
    for (const v of this.attributes) map[v.name] = v;
    return map;
  }
  /** 通用属性映射 */
  get uniformMap() {
    const map: Record<string, Uniform> = {};
    for (const v of this.uniforms) map[v.name] = v;
    return map;
  }
  constructor(
    /** 程序上下文 */
    private instance: Webgl,
    /** 源数据数组 */
    public data: number[],
    /** 绘图方式 */
    private drawType: DrawTypes,
    /** 顶点属性列表 */
    private attributes: Attribute[],
    /** 通用属性列表 */
    private uniforms: Uniform[]
  ) {
    this.updateAttributes();
    this.updateUniforms();
  }
  /** 更新节点属性 */
  updateAttributes() {
    this.attributes.forEach(v => (v.byteIndex = this.elementBytes * v.index));
    const { context, program, categoryBytes } = this;
    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, this.source, context.STATIC_DRAW);
    for (const { name, size, byteIndex } of this.attributes) {
      const attr = context.getAttribLocation(program, name);
      context.vertexAttribPointer(attr, size, context.FLOAT, false, categoryBytes, byteIndex);
      context.enableVertexAttribArray(attr);
    }
  }
  /** 更新通用属性 */
  updateUniforms() {
    const { context, program } = this;
    for (const { name, method, data } of this.uniforms) {
      const ArrayCstr = method.includes('fv') ? Float32Array : Int32Array;
      const uniIdx = context.getUniformLocation(program, name);
      const run = context[method] as Function;
      const params: any[] = [uniIdx, new ArrayCstr(data)];
      if (method.includes('Matrix')) params.splice(1, 0, false);
      run.apply(context, params);
    }
  }
  /** 绘制 */
  draw(drawType = this.drawType) {
    this.context.drawArrays(this.context[drawType], 0, this.sourceSize);
  }
}
