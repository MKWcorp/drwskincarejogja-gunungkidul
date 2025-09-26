// Global type declarations for CSS imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}

// For side-effect CSS imports (like Tailwind CSS)
// Handle various path patterns that might be used
declare module "../styles/globals.css" {
  const content: any;
  export = content;
}

declare module "./styles/globals.css" {
  const content: any;
  export = content;
}

declare module "@/styles/globals.css" {
  const content: any;
  export = content;
}

declare module "styles/globals.css" {
  const content: any;
  export = content;
}