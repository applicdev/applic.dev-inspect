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

    .pages-inner-resize {
      z-index: 20;
      position: relative;

      --rw: 0.25rem;
      --rw-hal: calc(var(--rw) / 2);

      width: var(--rw);
      margin: -50vh calc(-0.625rem - var(--rw-hal)) -50vh calc(-0.625rem - var(--rw-hal));

      cursor: w-resize;
      touch-action: none;
    }

    .pages-inner-resize[node-active] {
      background: #858585;
    }

    .pages-inner-resize::after {
      content: '';

      position: absolute;
      inset: 0rem calc(var(--rw) - 0.5rem);
    }
    .pages-inner-resize[node-active]::after {
      cursor: w-resize;
      inset: 0rem -100vw;
    }
  `;
}
