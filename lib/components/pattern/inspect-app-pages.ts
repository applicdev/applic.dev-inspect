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
      /* flex: 1; */
      flex-direction: column;

      width: var(--page-wid, unset);

      overflow: hidden;
    }

    .pages-inner-resize {
      z-index: 20;
      cursor: w-resize;

      --rw: 0.3125rem;
      --rw-hal: calc(var(--rw) / 2);

      width: var(--rw);
      margin: -50vh calc(-0.625rem - var(--rw-hal)) -50vh calc(-0.625rem - var(--rw-hal));
    }

    .pages-inner-resize[node-active] {
      background: #636363;
    }
  `;
}
