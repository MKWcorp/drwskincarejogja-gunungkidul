// CSS Module declarations - allows any CSS file to be imported
declare module "*.css" {
  const content: any;
  export default content;
}

declare module "*.scss" {
  const content: any;
  export default content;
}

declare module "*.sass" {
  const content: any;
  export default content;
}

// Specific declarations for common CSS import patterns
declare module "../styles/globals.css";
declare module "./styles/globals.css";
declare module "@/styles/globals.css";
declare module "styles/globals.css";