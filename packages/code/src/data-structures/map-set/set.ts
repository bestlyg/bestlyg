export interface Set<T> {
  size: number;
  empty: boolean;
  clear: () => void;
  contains: (val: T) => boolean;
  add: (val: T) => void;
  remove: (val: T) => void;
}
