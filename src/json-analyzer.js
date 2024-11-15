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
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: 0.5s;
        transition: 0.5s all ease-in-out;
      }

      .overview {
        width: 500px;
        padding: 10px;
        margin: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--ddd-theme-default-creekTeal);
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
      .item {
        margin: 10px;
        padding: 10px;
        border: 1px var(--ddd-theme-default-creekTeal) solid;
        width: 400px;
        height: 400px;
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
    `;
  }

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
  }

  render() {
    return html`
      <h2>Json Analyzer! Please enter your URL</h2>
      <!-- <input type="submit" value="Send Request" /> -->
      <!-- Slug: see webpage, see location: see location -->
      <form>
        <input id="input" placeholder="Add URL Here" />
        <button type="submit" class="AnalyzeButton" @click=${this.getData}>
          Analyze
        </button>
      </form>
      <div class="overview" style="background-color: ${this.hexcode}">
        <simple-icon icon="${this.icon}"></simple-icon>
        <img src="${this.inputLink}/${this.logo}" />
        <div class="info">
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
                locked=${item.locked}
                inputLink="${this.inputLink}"
              ></json-display>
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
        console.log(data);
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
        }
      });
  }

  // inputChanged(e) {
  //   this.value = this.shadowRoot.querySelector("#input").value;
  // }
  // // life cycle will run when anything defined in `properties` is modified
  // updated(changedProperties) {
  //   // see if value changes from user input and is not empty
  //   if (changedProperties.has("value") && this.value) {
  //     this.updateResults(this.value);
  //   } else if (changedProperties.has("value") && !this.value) {
  //     this.items = [];
  //   }
  //   // @debugging purposes only
  //   if (changedProperties.has("items") && this.items.length > 0) {
  //     console.log(this.items);
  //   }
  // }

  static get tag() {
    return "json-analyzer";
  }
}
customElements.define(JsonAnalyzer.tag, JsonAnalyzer);
