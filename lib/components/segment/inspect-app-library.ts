import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('inspect-app-library')
export class InspectAppLibrary extends LitElement {
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
        background: #efefef;
      }
    `,
  ];

  render() {
    return html` <div class="node c"></div> `;
  }
}
