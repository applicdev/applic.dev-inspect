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

        overflow: hidden;
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
        <div class="pages-inner" style="--page-wid: ${this.prime.length >= 1 ? 100 * this.frame.rat : 100}%">
          <!---->
          <div class="node app-tools">
            <div class="tools-focus"></div>
            <div class="tools-inner"></div>
          </div>
          <!---->

          <!---->
          <div class="node app-views">
            <!---->
            ${this.aside.map((ele) => html`<div class="app-views-plane" ?node-active="${ele.active}">${ele.node}</div> `)}
            <!---->
          </div>
          <!---->

          <!---->
          ${this.aside.length >= 2
            ? html`
                <div class="node app-views-navigation">
                  ${this.aside.map(
                    (ele) => html`
                      <button class="views-navigation-item" ?node-active="${ele.active}" @click="${this.requestView.bind(this, ele)}">
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
              <div class="pages-inner-resize" @pointerdown="${this.requestMove.bind(this)}" ?node-active="${this.tra}"></div>

              <div class="pages-inner" style="--page-wid: ${100 * (1 - this.frame.rat)}%">
                <!---->
                <div class="node app-tools">
                  <div class="tools-inner"></div>
                </div>
                <!---->

                <!---->
                <div class="node app-views">
                  <!---->
                  ${this.prime.map((ele) => html`<div class="app-views-plane" ?node-active="${true}">${ele.node}</div> `)}
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
      rat: 1 / 2.5,
      ele: {
        imp: { caption: 'Imports', node: new Segment.InspectAppImports() },
        pre: { caption: 'Preview', node: new Segment.InspectAppPreview() },
        exp: { caption: 'Exports', node: new Segment.InspectAppExports() },
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

    this.prime = this.frame.lay >= 1 ? [seg.shift()] : [];
    this.aside = this.frame.lay >= 1 ? seg : seg;

    const act = this.aside.filter((seg) => seg.active);
    if (act.length <= 0) {
      Object.values(this.frame.ele).map((seg) => {
        seg.active = false;
      });

      this.aside[0].active = true;
    }
  }

  whenTranslate() {
    this.frame.lay = this.parentNode.offsetWidth < 840 ? 0 : 1;

    this.requestUpdate();
    requestAnimationFrame(() => this.requestUpdate());
  }

  requestView(ele) {
    Object.values(this.frame.ele).map((seg) => {
      seg.active = false;
    });

    ele.active = true;
    this.requestUpdate();
  }

  requestMove(eve) {
    eve.preventDefault();

    this.tra = true;

    const cur = { rat: this.frame.rat };
    const act = this.frame;
    const wid = this.parentNode.offsetWidth;

    let sta;
    let las;
    
    const onMove = (eve) => {
      eve.preventDefault();
      
      const mov = {x: eve.pageX, y:eve.pageY};
      if (!sta) sta = {...mov};
      const pos = { x: mov.x - sta.x, y: mov.y - sta.y };

      if (las && las.x == pos.x && las.y == pos.y) return;
      las = pos;

      // ---
      const node = this.shadowRoot.querySelector('.pages-inner-resize');
      node.style.transform = `translate(${pos.x}px)`;
      // ---

      this.requestUpdate();
    };

    const onExit = () => {
      eve.preventDefault();

      requestAnimationFrame(() => {
        this.tra = false;
        this.requestUpdate();

        this.removeEventListener('pointerup', onExit);
        this.removeEventListener('pointermove', onMove);

        // ---
        const node = this.shadowRoot.querySelector('.pages-inner-resize');
        node.style.transform = `unset`;
        // ---
      });
    };

    this.addEventListener('pointercancel', onExit, false);
    this.addEventListener('pointerup', onExit, false);
    this.addEventListener('pointermove', onMove, false);
  }
}
