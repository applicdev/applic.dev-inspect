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

      overflow: hidden;
    }

    .pages-inner-resize {
      width: 0.25rem;
    }
  `;
}