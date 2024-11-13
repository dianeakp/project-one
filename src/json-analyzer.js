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
      <input
        id="input"
        placeholder="Add URL Here"
        @keydown=${this.handleKeyDown}
      />
      <button class="AnalyzeButton" @click=${this.getData}>Analyze</button>
      <div class="results">
        ${this.items.map(
          (item, index) => html`
            <json-display
              source=${item.href}
              title=${item.title}
              description=${item.description}
              slug=https://www.haxtheweb.org/${item.slug}
              location=https://www.haxtheweb.org/${item.location}
              image=https://www.haxtheweb.org/${item.image}
              locked=${item.locked}
            ></json-display>
          `
        )}
      </div>

      <simple-icon icon="${this.icon}"></simple-icon>
    `;
  }

  handleKeyDown(event) {
    if (event.key === "Enter" || event.key === "Return") {
      this.getData();
    }
  }

  getData(e) {
    e.preventDefault();
    this.loading = true;
    this.inputLink = this.shadowRoot.querySelector("input").value;
    fetch(`https://${this.inputLink}/site.json`)
      .then((d) => (d.ok ? d.json() : {}))
      .then((data) => {
        console.log(data);
        if (data) {
          this.items = [];
          this.items = data.items;
          // this.name = data.title;
          // this.description = data.description;
          // this.logo = data.metadata.site.logo;
          // // make logo into image with this as the site ref
          // this.theme = data.metadata.theme.element;
          // this.created = data.metadata.site.created;
          // this.lastUpdated = data.metadata.site.updated;
          // this.hexcode = data.metadata.theme.hexCode;
          // this.icon = data.metadata.theme.icon;

          console.log(this.items);
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
