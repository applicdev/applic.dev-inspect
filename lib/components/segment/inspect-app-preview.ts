import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inspect-app-preview')
export class InspectAppPreview extends LitElement {
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
        background: #f8d8a7;
      }
    `,
  ];

  render() {
    return html` <div class="node c"></div> `;
  }
}
