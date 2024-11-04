/**
 * Copyright 2024 dianeakp
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `project-one`
 *
 * @demo index.html
 * @element project-one
 */
export class projectOne extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "project-one";
  }

  constructor() {
    super();
    this.siteName = "";
    this.description = "";
    this.logo = "";
    this.theme = "";
    this.created = "";
    this.lastUpdated = "";
    this.hexCode = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      siteName: { type: String, reflect: true, attribute: "site-name" },
      //true means to have it appear as an attribute in HTML
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      hexCode: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h3 span {
          font-size: var(--project-one-label-font-size, var(--ddd-font-size-s));
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <h3><span>${this.title}Code Goes Here!</span> ${this.title}</h3>
      <p>
        Properties have been initialized. More developments will be made this
        coming week!
      </p>
      <p>
        * unfortunately * npm install --global @haxtheweb/create does not work
        for me!
      </p>
      <p>Will try again at office hours or during class time</p>

      <h1>Game Plan</h1>
      <p>
        Step 1: Code the functionality to take the URL, check for site.json, and
        fetch it
      </p>
      <p>
        Step 2: Populate the overview section as described in my diagram and
        create cards for each item
      </p>
      <p>
        Step 3: Test to ensure re-entering a URL clears the orevious data and
        refreshes
      </p>

      <h1>Diagram Plan</h1>
      <img src="lib/diagram/diagram.png" />
      <slot></slot>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(projectOne.tag, projectOne);
