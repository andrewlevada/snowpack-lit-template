import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { html as staticHtml, unsafeStatic } from "lit/static-html.js";
import { query, state } from "lit/decorators.js";
import { componentStyles } from "~src/global";
import { defineComponent } from "~utils/components";

interface PageInfo {
    tag: string;
    importPath?: string;
}

export abstract class AppPageElement extends LitElement {
    public requestReload(): void { }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
        this.requestReload();
    }
}

export default (): void => defineComponent("app-router", AppRouter);
export class AppRouter extends LitElement {
    @state() page: PageInfo | null = null;

    @query("#page-element") pageElement!: AppPageElement;

    render(): TemplateResult {
        if (!this.page) return html``;

        const tag = unsafeStatic(`app-page--${this.page.tag}`);
        return staticHtml`
            <${tag} id="page-element"></${tag}>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.updatePage();
    }

    private updatePage(): void {
        const newPage = AppRouter.choosePage();
        if (this.page && this.page.tag === newPage.tag) {
            this.pageElement.requestReload();
            return;
        }

        this.page = newPage;

        // This has to be here until esbuild will do something about this
        // https://github.com/evanw/esbuild/issues/700
        import(`../../../pages${this.page.importPath || ""}/${this.page.tag}/index.js`).then().catch();
    }

    private static choosePage(): PageInfo {
        const pathname = window.location.pathname;
        const path = pathname.endsWith("/") ? pathname.substring(0, pathname.length-1) : pathname;

        if (path === "") return { tag: "test" };

        return { tag: "not-found" };
    }

    static styles = [...componentStyles, css`
      :host {
        width: 100%;
        height: 100%;
        display: block;
      }
    `];
}
