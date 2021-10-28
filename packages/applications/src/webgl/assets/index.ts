import skyImage from './sky.jpg';
import marshmelloImage from './marshmello.jpg';
export interface Assets {
  image: string;
  source?: number[];
  arrays?: number[];
  pins?: number[];
}
export { default as cube } from './cube';
export const sky: Assets = { image: skyImage };
export const marshmello: Assets = { image: marshmelloImage };
