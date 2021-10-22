import { ASYNC } from '@bestlyg/shared';
import { UniformMethods } from '../types';
import { loadTexture } from '../utils';
import { Webgl } from '../webgl';

interface TextureOptions {
  magFilter: 'LINEAR' | 'NEAREST';
  minFilter:
    | 'LINEAR'
    | 'NEAREST'
    | 'NEAREST_MIPMAP_NEAREST'
    | 'NEAREST_MIPMAP_LINEAR'
    | 'LINEAR_MIPMAP_NEAREST'
    | 'LINEAR_MIPMAP_LINEAR';
  wrapS: 'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT';
  wrapT: 'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT';
}
export interface MaterialProps {
  webgl: Webgl;
  uniforms: {
    name: string;
    data: number[];
    method: UniformMethods;
  }[];
  textures: {
    name: string;
    source: string;
    format: 'RGB' | 'RGBA';
    options: Partial<TextureOptions>;
  }[];
  program: WebGLProgram;
}
interface Uniform {
  name: string;
  data: number[];
  method: UniformMethods;
  location: WebGLUniformLocation;
  needUpdate: boolean;
  ArrayCstr: Float32ArrayConstructor | Int32ArrayConstructor;
}
interface Texture {
  name: string;
  source: string;
  format: 'RGB' | 'RGBA';
  options: Partial<TextureOptions>;
  location: WebGLUniformLocation;
  needUpdate: boolean;
  image: HTMLImageElement;
}
export class Material {
  private webgl: Webgl;
  private program: WebGLProgram;
  private uniforms: Uniform[] = [];
  private uniformMap: Record<string, Uniform> = {};
  private textures: Texture[] = [];
  private textureMap: Record<string, Texture> = {};
  init = false;
  constructor({ webgl, program, uniforms, textures }: MaterialProps) {
    this.webgl = webgl;
    this.program = program;
    const { context } = webgl;
    for (const uniform of uniforms) {
      const location = context.getUniformLocation(program, uniform.name);
      if (!location) return;
      const data = {
        ...uniform,
        location: context.getUniformLocation(program, uniform.name)!,
        needUpdate: true,
        ArrayCstr: uniform.method.includes('fv') ? Float32Array : Int32Array,
      };
      this.uniforms.push(data);
      this.uniformMap[data.name] = data;
    }
    textures = textures.filter(({ name }) => context.getUniformLocation(program, name));
    const n = textures.length;
    Promise.all(textures.map(({ source }) => loadTexture(source)))
      .then(images => {
        for (let i = 0; i < n; i++) {
          const data = {
            ...textures[i],
            location: context.getUniformLocation(program, textures[i].name)!,
            needUpdate: true,
            image: images[i],
          };
          this.textures.push(data);
          this.textureMap[data.name] = data;
        }
      })
      .finally(() => {
        this.init = true;
      });
  }
  updateUnifom() {
    const {
      uniforms,
      webgl: { context },
    } = this;
    for (const uniform of uniforms) {
      const { data, method, location, needUpdate, ArrayCstr } = uniform;
      if (!needUpdate) return;
      uniform.needUpdate = false;
      const run = context[method] as Function;
      const paramData = new ArrayCstr(data);
      if (method.includes('Matrix')) run.apply(context, [location, false, paramData]);
      else run.apply(context, [location, paramData]);
    }
  }
  updateTextures() {
    const {
      webgl: { context },
    } = this;
    const n = this.textures.length;
    const texture2D = context.TEXTURE_2D;
    for (let i = 0; i < n; i++) {
      const {
        location,
        format,
        options: {
          magFilter = 'LINEAR',
          minFilter = 'NEAREST_MIPMAP_LINEAR',
          wrapS = 'REPEAT',
          wrapT = 'REPEAT',
        },
        needUpdate,
        image,
      } = this.textures[i];
      if (!needUpdate) continue;
      this.textures[i].needUpdate = false;
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
        image
      );
      context.texParameteri(texture2D, context.TEXTURE_WRAP_S, context[wrapS]);
      context.texParameteri(texture2D, context.TEXTURE_WRAP_T, context[wrapT]);
      context.texParameteri(texture2D, context.TEXTURE_MAG_FILTER, context[magFilter]);
      if (minFilter.includes('MIPMAP')) context.generateMipmap(texture2D);
      context.texParameteri(texture2D, context.TEXTURE_MIN_FILTER, context[minFilter]);
      context.uniform1i(location, i);
    }
  }
  update() {
    this.updateUnifom();
    this.updateTextures();
  }
  setUniform(key: string, data: number[]) {
    const { uniformMap } = this;
    const uniform = uniformMap[key];
    if (!uniform) return;
    uniform.data = data;
    uniform.needUpdate = true;
  }
  setTextures(key: string, options: Partial<TextureOptions>) {
    const { textureMap } = this;
    const texture = textureMap[key];
    if (!texture) return;
    texture.options = options;
    texture.needUpdate = true;
  }
}
