declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export const meta: any;
  export default MDXComponent;
}
