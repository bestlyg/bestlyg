declare const __SERVICE_URL__: string;
declare const __VERSION__: string;
declare const __ENV_DEV__: string;
declare const __ENV_PROD__: string;
declare const __TAG_ENV__: string;
declare const __TAG_END__: string;
declare module '*.scss' {
  const style: Record<string, string>;
  export default style;
}
declare module '*.png' {
  const str: string;
  export default str;
}
