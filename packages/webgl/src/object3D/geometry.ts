import { Webgl } from '../webgl';

export interface GeometryProps {
  program: WebGLProgram;
  webgl: Webgl;
  attributes: {
    name: string;
    size: number;
    data: number[];
  }[];
  indexes?: number[];
}
interface Attribute {
  buffer: WebGLBuffer;
  name: string;
  location: number;
  size: number;
  needUpdate: boolean;
  data: number[];
}
interface Indexes {
  buffer: WebGLBuffer;
  data: number[];
  needUpdate: boolean;
}
export class Geometry {
  private webgl: Webgl;
  private program: WebGLProgram;
  private indexes: Indexes;
  get count() {
    return this.indexes.data.length;
  }
  private attributes: Attribute[] = [];
  private attributeMap: Record<string, Attribute> = {};
  constructor({ webgl, attributes, indexes = [], program }: GeometryProps) {
    this.webgl = webgl;
    this.program = program;
    this.initAttribute(attributes);
    this.initIndexes(indexes);
    this.update();
  }
  private initAttribute(attrs: GeometryProps['attributes']) {
    const {
      webgl: { context },
      program,
      attributes,
      attributeMap,
      webgl,
    } = this;
    for (const { name, size, data } of attrs) {
      const location = context.getAttribLocation(program, name);
      if (location < 0) continue;
      const buffer = context.createBuffer()!;
      const attr: Attribute = {
        name,
        size,
        location,
        needUpdate: true,
        buffer,
        data,
      };
      attributes.push(attr);
      attributeMap[name] = attr;
    }
  }
  private updateAttribute() {
    const {
      webgl: { context },
      attributes,
    } = this;
    const arrayBuffer = context.ARRAY_BUFFER;
    for (const attr of attributes) {
      const { location, size, buffer, needUpdate, data } = attr;
      context.bindBuffer(arrayBuffer, buffer);
      if (needUpdate) {
        attr.needUpdate = false;
        context.bufferData(arrayBuffer, new Float32Array(data), context.STATIC_DRAW);
      }
      context.vertexAttribPointer(location, size, context.FLOAT, false, 0, 0);
      context.enableVertexAttribArray(location);
    }
  }
  private initIndexes(data: number[]) {
    const {
      attributes,
      webgl: { context },
    } = this;
    const indexes: Indexes = {
      data,
      needUpdate: true,
      buffer: context.createBuffer()!,
    };
    if (data.length === 0) {
      const attr = attributes[0];
      indexes.data = new Array(attr.data.length / attr.size).fill(0).map((_, i) => i);
    }
    this.indexes = indexes;
  }
  private updateIndexes() {
    const {
      webgl: { context },
      indexes,
    } = this;
    const eleArrayBuffer = context.ELEMENT_ARRAY_BUFFER;
    context.bindBuffer(eleArrayBuffer, indexes.buffer);
    if (indexes.needUpdate) {
      indexes.needUpdate = false;
      context.bufferData(eleArrayBuffer, new Uint8Array(indexes.data), context.STATIC_DRAW);
    }
  }
  update() {
    this.updateAttribute();
    this.updateIndexes();
  }
  setData(name: string, data: number[]) {
    const { attributeMap } = this;
    const attr = attributeMap[name];
    if (!attr) return;
    attr.data = data;
    attr.needUpdate = true;
  }
  setIndexes(data: number[]) {
    this.indexes.data = data;
    this.indexes.needUpdate = true;
  }
}
