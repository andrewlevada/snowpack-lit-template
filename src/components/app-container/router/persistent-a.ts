import { css, LitElement, TemplateResult } from "lit";
import { html } from "lit/static-html.js";
import { property } from "lit/decorators.js";
import { componentStyles } from "~src/global";
import { defineComponent } from "~utils/components";

export default (): void => defineComponent("persistent-a", PersistentAnchor);
export class PersistentAnchor extends LitElement {
    @property({ type: String }) href!: string;

    render(): TemplateResult {
        return html`
            <a @click=${this.onClick} class="flex row gap align-center">
                <slot></slot>
            </a>
        `;
    }

    private onClick(): void {
        if (!this.href) throw new Error("No href provided to persistent anchor");
        window.history.pushState(null, "", `/app${this.href}`);
        window.dispatchEvent(new Event("history_push"));
    }

    static styles = [...componentStyles, css`
      a {
        display: flex;
        cursor: pointer;
        text-decoration: underline;
      }
    `]
}
