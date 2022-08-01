import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inspect-app-exports')
export class InspectAppExports extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .node.c {
        display: flex;
        flex: 1;

        margin: 1.25rem;
        background: #c5ebdc;
      }
    `,
  ];

  render() {
    return html` <div class="node c"></div> `;
  }
}
