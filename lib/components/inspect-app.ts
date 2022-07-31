import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inspect-app')
class InspectApp extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;

        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .node.app-navigation {
      }
    `,
  ];

  render() {
    return html`
      <!---->
      <div class="node bounds-warp">
        <!---->
        <div>
          <inspect-app-directories></inspect-app-directories>
        </div>
        <!---->

        <!---->
        <div>
          <inspect-app-viewing></inspect-app-viewing>
        </div>
        <!---->
      </div>
      <!---->

      <!---->
      <div class="node app-navigation">
        <span>Hello!</span>
      </div>
      <!---->
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.document.title = `Inspect - Twitch Elements`;
  }
}
