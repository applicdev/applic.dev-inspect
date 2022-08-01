import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import * as Pattern from './pattern/mod.ts';
import * as Segment from './segment/mod.ts';

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

      ${Pattern.InspectAppPages()}
      ${Pattern.InspectAppViews()}
      ${Pattern.InspectAppTools()}
    `,
  ];

  render() {
    return html`
      <div class="node app-pages">
        <!---->
        <div class="pages-inner">
          <!---->
          <div class="node app-tools">
            <div class="tools-focus"></div>
            <div class="tools-inner"></div>
          </div>
          <!---->

          <!---->
          <div class="node app-views">
            <!---->
            ${this.aside.map((ele) => ele.node)}
            <!---->
          </div>
          <!---->

          <!---->
          ${this.aside.length >= 2
            ? html`
                <div class="node app-views-navigation">
                  ${this.aside.map(
                    (ele) => html`
                      <button class="views-navigation-item">
                        <span>${ele.caption}</span>
                      </button>
                    `
                  )}
                </div>
              `
            : html``}
          <!---->
        </div>
        <!---->

        <!---->
        ${this.prime.length >= 1
          ? html`
              <div class="pages-inner-resize"></div>

              <div class="pages-inner">
                <!---->
                <div class="node app-tools">
                  <div class="tools-inner"></div>
                </div>
                <!---->

                <!---->
                <div class="node app-views">
                  <!---->
                  ${this.prime.map((ele) => ele.node)}
                  <!---->
                </div>
                <!---->
              </div>
            `
          : html``}
        <!---->
      </div>
    `;
  }

  frame: {};
  aside: any[];
  prime: any[];

  connectedCallback() {
    super.connectedCallback();
    globalThis.document.title = `Inspect - Twitch Elements`;

    this.frame = {
      ele: {
        imp: { caption: 'Imports', node: new Segment.InspectAppImports() },
        pre: { caption: 'Preview', node: new Segment.InspectAppPreview() },
        // exp: { caption: 'Exports', node: new Segment.InspectAppExports() },
        // lib: { caption: 'Library', node: new Segment.InspectAppLibrary() },
      },
    };

    this.aside = [];
    this.prime = [];
  }

  firstUpdated() {
    globalThis.addEventListener('resize', this.whenTranslate.bind(this), false);
    this.whenTranslate();
  }

  updated() {
    const seg = Object.values(this.frame.ele);

    this.prime = this.frame.lay >= 1 ? [seg.pop()]: [];
    this.aside = this.frame.lay >= 1 ? seg : seg;
  }

  whenTranslate() {
    this.frame.lay = this.parentNode.offsetWidth < 840 ? 0 : 1;
    
    this.requestUpdate();
    requestAnimationFrame(() => this.requestUpdate());
  }
}
