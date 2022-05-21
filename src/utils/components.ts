/**
 * This function is used instead of Lit's @customElement decorator
 * because it allows exporting element declaration avoiding usage of side effects
 * therefore decreasing bundle size
 */
export function defineComponent(tag: string, c: CustomElementConstructor): void {
    if (customElements.get(tag) === undefined) customElements.define(tag, c);
}

// Export custom elements like this:
// export default (): void => defineComponent("tag-name", ComponentClass);
//
// Import like this:
// import("~components/tag-name").then(f => f.default());

// NOTE:
// If you want to use Lit's @customElement decorator instead of this function
// don't forget to add components folder to side effects if package.json
//
// In package.json:
// "sideEffects": [
//     "./src/pages/global.ts", "./src/components/**/*.ts"
//   ],

/**
 * TODO
 */
export function waitForRender(): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(() => resolve(), 0);
    });
}
