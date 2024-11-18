import { LitElement, html, css } from "lit";
import "@haxtheweb/simple-icon/simple-icon.js";
// import "./json-analyzer.js";
export class JsonAnalyzer extends LitElement {
  static get properties() {
    return {
      inputLink: { type: String },
      name: { type: String },
      description: { type: String },
      logo: { type: String },
      lastUpdated: { type: String },
      items: { type: Array },
      value: { type: String },
      loading: { type: Boolean, reflect: true },
      hexcode: { type: String },
      icon: { type: String },
      isVisible: { type: Boolean },
      // slug: { type: String },
      // location: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      img {
        max-width: 200px;
        max-height: 100px;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }

      .AnalyzeButton {
        background-color: var(--ddd-theme-default-keystoneYellow);
        height: 45px;
        width: 120px;
        border: 1px var(--ddd-theme-default-creekTeal) solid;
        box-shadow: none;
        font-family: var(--ddd-font-primary);
        font-size: 16px;
        border-radius: 5px;
        display: inline-block;
      }

      input {
        font-size: 20px;
        line-height: 40px;
        width: 400px;
        left: 350px;
        display: inline-block;
        margin-right: 10px;
        border-radius: 5px;
        box-shadow: none;
        border: 1px var(--ddd-theme-default-creekTeal) solid;
      }

      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: 0.5s;
        transition: 0.5s all ease-in-out;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
      .item {
        flex: 1 1 calc(25% - 20px);
        box-sizing: border-box;
        width: 320px;
        margin: 10px;
        padding: 10px;
        border: 1px var(--ddd-theme-default-creekTeal) solid;
        /* width: 300px; */
        height: 560px;
        flex-wrap: wrap;
        gap: 16px;
        text-align: center;
        justify-content: center;
        align-items: center;
      }

      .header {
        display: flex;
        justify-content: center; /* Horizontal alignment */
        align-items: center; /* Vertical alignment */
      }

      .overview {
        width: 500px;
        padding: 20px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: blue;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }

      #btn {
        background-color: var(--ddd-theme-default-keystoneYellow);
        height: 45px;
        width: 120px;
        border: 1px var(--ddd-theme-default-creekTeal) solid;
        box-shadow: none;
        font-family: var(--ddd-font-primary);
        font-size: 16px;
        border-radius: 5px;
        margin: 10px auto;
        /* display: inline-block; */
      }

      @media (max-width: 1024px) {
        .results {
          grid-template-columns: repeat(
            auto-fit,
            minmax(3, 1fr)
          ); /* 3 cards per row for tablets */
        }
      }

      @media (max-width: 768px) {
        .results {
          grid-template-columns: repeat(
            auto-fit,
            minmax(2, 1fr)
          ); /* 2 cards per row for small tablets */
        }
      }

      @media (max-width: 480px) {
        .results {
          grid-template-columns: repeat (auto-fit, minmax() (2, 1fr)); /* 1 card per row for mobile */
        }
      }
    `;
  }

  //responsive so cards flex to fill area appropriately on all screen sizes
  // max 4 across
  // if nothing entered, overview is  not visible
  //buttons to send

  constructor() {
    super();
    this.name = "";
    this.description = "";
    this.logo = "";
    this.lastUpdated = "";
    this.items = [];
    this.value = null;
    this.loading = false;
    this.inputLink = "";
    this.hexcode = "";
    this.icon = "";
    this.isVisible = false;
  }

  render() {
    return html`
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <h2>Json Analyzer! Please enter your URL</h2>
      <div class="header">
        <form>
          <input id="input" placeholder="Add URL Here" />
          <button type="submit" class="AnalyzeButton" @click=${this.getData}>
            Analyze
          </button>
        </form>
      </div>

      <div class="overview" style="background-color: ${this.hexcode}">
        <div class="info" ?hidden="${!this.isVisible}">
          <img src="${this.inputLink}/${this.logo}" />
          <simple-icon icon="${this.icon}"></simple-icon>
          <div class="name">${this.name}</div>
          <div class="description">${this.description}</div>
          <div class="lastUpdated">
            Last Updated: ${this.toDate(this.lastUpdated)}
          </div>
          <div class="theme">Theme: ${this.theme}</div>
          <div class="created">Created: ${this.toDate(this.created)}</div>
        </div>
      </div>
      <div class="results">
        ${this.items.map(
          (item, index) => html`
            <div class="item">
              <json-display
                source="${item.href}"
                title="${item.title}"
                description="${item.description}"
                slug="${item.slug}"
                location="${item.location}"
                img="${item.metadata &&
                item.metadata.files &&
                item.metadata.files[0]
                  ? item.metadata.files[0].url
                  : `${this.logo}`}"
                updateddate=${this.toDate(item.metadata.updated)}
                order=${item.order}
                inputLink="${this.inputLink}"
              ></json-display>

              <a href="${this.inputLink}/${item.slug}" target="_blank">
                <button class="slug" id="btn">See Webpage</button>
              </a>

              <a href="${this.inputLink}/${item.location}" target="_blank">
                <button class="location" id="btn">See Location</button>
              </a>
            </div>
          `
        )}
      </div>

      <!-- if img returns nothing, instead return this.backup img = URL for hax stuff -->
    `;
  }

  toDate(timestamp) {
    return new Date(timestamp * 1000).toUTCString();
  }

  getData(e) {
    e.preventDefault();
    this.isVisible = false;
    this.loading = true;
    this.inputLink = this.shadowRoot.querySelector("input").value;
    if (!this.inputLink.startsWith("https://")) {
      this.inputLink = "https://" + this.inputLink;
    }

    if (!this.inputLink.endsWith("/site.json")) {
      this.inputLink = this.inputLink.replace("/site.json", "");
    }
    fetch(`${this.inputLink}/site.json`)
      .then((d) => (d.ok ? d.json() : {}))
      .then((data) => {
        if (data) {
          this.items = [];
          this.items = data.items;
          this.name = data.title;
          this.description = data.description;
          this.logo = data.metadata.site.logo;
          // make logo into image with this as the site ref
          this.theme = data.metadata.theme.element;
          this.created = data.metadata.site.created;
          this.lastUpdated = data.metadata.site.updated;
          this.hexcode = data.metadata.theme.variables.hexCode;
          this.icon = data.metadata.theme.variables.icon;
          console.log(this.icon);
          this.loading = false;
          this.isVisible = true;
        }
      });
  }

  static get tag() {
    return "json-analyzer";
  }
}
customElements.define(JsonAnalyzer.tag, JsonAnalyzer);
