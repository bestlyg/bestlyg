import SparkMD5 from 'spark-md5';

const SLICE_SIZE_DEFAULT = 2 * 1024 * 1024;

export interface HashProps {
  file: File;
  setLoading?: (v: number) => void;
}
export abstract class Hash<T extends HashProps> {
  props: T;
  private _loading = -1;
  get loading() {
    return this._loading;
  }
  set loading(v: number) {
    this._loading = v;
    this.props.setLoading?.(v);
  }
  constructor(props: T) {
    this.props = props;
  }
  abstract hash(): Promise<string>;
}
export interface HashSyncProps extends HashProps {
  sliceSize?: number;
}
/**
 * 全量hash计算
 */
export class HashSync extends Hash<HashSyncProps> {
  sliceSize: number;
  spark = new SparkMD5.ArrayBuffer();
  constructor(props: HashSyncProps) {
    super(props);
    this.sliceSize = this.props.sliceSize ?? SLICE_SIZE_DEFAULT;
  }
  hash(): Promise<string> {}
}
