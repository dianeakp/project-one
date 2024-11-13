import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

// https://oer.hax.psu.edu/bto108/sites/haxcellence/documentation/ddd

export class JsonDisplay extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = "";
    this.slug = "";
    this.description = "";
    this.location = "";
    this.img = "";
    this.locked = "";
    this.updated = "";
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      description: { type: String, attribute: "alt-description" },
      slug: { type: String },
      location: { type: String },
      img: { type: String },
      locked: { type: String },
      updated: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        .image {
          display: inline-block;
        }

        div:hover {
          background-color: var(--ddd-theme-default-skyLight);
        }

        .image div {
          max-width: 240px;
          font-size: 16px;
          font-weight: bold;
        }

        .image img {
          display: block;
          width: 240px;
          height: 240px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="image">
        <img src="${this.img}" alt="${this.title}" />
        <div>Title: ${this.title}</div>
        <div>Description: ${this.description}</div>
        <div><a href="${this.slug}" target="_blank">Slug</a></div>
        <div><a href="${this.location}" target="_blank">Location</a></div>
        <div>Locked: ${this.locked}</div>
        <div>Updated: ${this.updated}</div>
      </div>
    `;
  }
  static get tag() {
    return "json-display";
  }
}
customElements.define(JsonDisplay.tag, JsonDisplay);
