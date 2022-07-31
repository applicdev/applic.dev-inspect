import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('page-bounds')
export class PageBounds extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        inset: 0rem 0rem;

        display: flex;
        flex: none;
        flex-direction: column;
      }

      .node.bounds-warp {
        position: relative;

        display: flex;
        flex: 1;
        flex-direction: column;
      }
    `,
  ];

  render() {
    return html`
      <div class="node bounds-warp">
        <!---->
        <slot></slot>
        <!---->
      </div>
    `;
  }
}
