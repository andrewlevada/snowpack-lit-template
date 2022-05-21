import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { pageStyles } from "~src/global";
import { AppPageElement } from "~components/app-container/router/app-router";
import scopedStyles from "./styles.lit.scss";

import("~components/app-container/router/persistent-a").then(f => f.default());

@customElement("app-page--test")
export default class TestPage extends AppPageElement {
    render(): TemplateResult {
        return html`
            <div class="container">
                <h1>Hello!</h1>
                <persistent-a>Let's go to 404</persistent-a>
            </div>
        `;
    }

    static styles = [...pageStyles, scopedStyles];
}
