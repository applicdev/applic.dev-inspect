import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inspect-app-exports')
export class InspectAppExports extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        inset: 0rem 0rem;

        display: flex;
        flex: 1;
        flex-direction: column;
      }
    `,
  ];

  render() {
    return html` <div class="node"></div> `;
  }
}
