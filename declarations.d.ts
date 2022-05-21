// This part allows you to reference styles from scripts

declare module "*.css" {
  const content: CSSStyleSheet;
  export default content;
}

declare module "*.scss" {
  const content: CSSStyleSheet;
  export default content;
}

// This part allows you to reference images and fonts from scripts

declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.otf";

// Global variable managed by the bundler
declare const PRODUCTION: boolean;
