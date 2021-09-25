import { Attribute, DrawTypes, UniformCommon, Uniform, UniformMatrix } from './types';
import { Webgl } from './webgl';

export class Poly {
  get context() {
    return this.instance.context;
  }
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
    public source: Float32Array,
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
  updateUniforms() {
    for (const uniform of this.uniforms) {
      if (uniform.method.includes('Matrix')) this.updateMatrixUniforms(uniform as UniformMatrix);
      else this.updateCommonUniforms(uniform as UniformCommon);
    }
  }
  private updateMatrixUniforms({ name, method, data }: UniformMatrix) {
    const { context, program } = this;
    const uniIdx = context.getUniformLocation(program, name);
    context[method](uniIdx, false, data);
  }
  private updateCommonUniforms({ name, method, data }: UniformCommon) {
    const { context, program } = this;
    const uniIdx = context.getUniformLocation(program, name);
    context[method](uniIdx, data as any);
  }
  draw(drawType = this.drawType) {
    this.context.drawArrays(this.context[drawType], 0, this.sourceSize);
  }
}
