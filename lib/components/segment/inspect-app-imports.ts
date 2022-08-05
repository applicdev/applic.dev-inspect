import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { storage } from '../actions/mod.ts';

@customElement('inspect-app-imports')
export class InspectAppImports extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;

        padding: 1.25rem;
      }

      .node.c {
        display: flex;
        flex: 1;
        background: #dce3ff;
      }
    `,
  ];

  render() {
    // return html` <div class="node c"></div> `;
    return html`
      <button @click="${this.storageInc.bind(this)}">inc</button>
      <button @click="${this.storageDec.bind(this)}">dec</button>
      <br />
      <h2>Counter: ${this.storage['debug-counter'].val}</h2>
    `;
  }

  storageInc() {
    storage.dispatch({ type: 'counter:inc' }, {});
  };
  storageDec() {
    storage.dispatch({ type: 'counter:dec' }, {});
  };

  constructor() {
    super();
    this.storage = storage.getState();
  }

  firstUpdated() {
    storage.subscribe(() => {
       this.storage = storage.getState();
       this.requestUpdate();
    });
  }
}
