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
    this.order = "";
    this.updateddate = "";
    this.inputLink = "";
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      description: { type: String },
      slug: { type: String },
      location: { type: String },
      img: { type: String },
      order: { type: String },
      updateddate: { type: String },
      inputLink: { type: String },
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
          font-family: Helvetica, sans-serif;
          /* font-weight: bold; */
        }

        .image img {
          display: block;
          width: 240px;
          height: 240px;
          justify-content: center;
        }
        .title {
          margin: 10px;
          font-weight: bold;
          color: var(--ddd-theme-default-success);
        }
        .description {
          font-weight: lighter;
          margin: 5px;
        }
        .card-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card-container">
        <div class="image">
          <img src="${this.inputLink}/${this.img}" alt="${this.title}" />
          <div class="title">Title: ${this.title}</div>
          <div class="description">${this.description}</div>
          <div>Order: ${this.order}</div>
          <div>Updated: ${this.updateddate}</div>
        </div>
      </div>
    `;
  }
  static get tag() {
    return "json-display";
  }
}
customElements.define(JsonDisplay.tag, JsonDisplay);
