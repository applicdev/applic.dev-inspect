import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inspect-app-imports')
export class InspectAppImports extends LitElement {
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
        background: #dce3ff;
      }
    `,
  ];

  render() {
    return html` <div class="node c"></div> `;
  }
}
