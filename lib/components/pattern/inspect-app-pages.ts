import { css } from 'lit';

export function InspectAppPages() {
  return css`
    /*  */
    .node.app-pages {
      display: flex;
      flex: 1;
      flex-direction: row;
    }

    .node.app-pages > .pages-inner {
      display: flex;
      flex: 1;
      flex-direction: column;

      min-width: var(--page-wid, unset);
      max-width: var(--page-wid, unset);

      overflow: hidden;
    }

    .node.app-pages > .pages-inner:not(:first-child) {
      margin-left: -0.625rem;
    }

    .node.app-pages > .pages-inner:not(:last-child) {
      margin-right: -0.625rem;
    }

    /*  */
    .pages-inner-resize {
      z-index: 20;
      position: relative;

      width: 0.25rem;
      margin: -50vh -0.125rem;

      cursor: w-resize;
      touch-action: none;
    }

    .pages-inner-resize[node-active] {
      background: #858585;
    }

    .pages-inner-resize::after {
      content: '';

      position: absolute;
      inset: 0rem calc(0.25rem - 0.5rem);
    }
    .pages-inner-resize[node-active]::after {
      cursor: w-resize;
      inset: 0rem -100vw;
    }
  `;
}
