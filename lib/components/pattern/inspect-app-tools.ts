import { css } from 'lit';

export function InspectAppTools() {
  return css`
    /*  */
    .node.app-tools {
      display: flex;
      flex: none;
      flex-direction: row;

      height: 3rem;
      background: #f6f6f6;
    }

    .node.app-tools > .tools-focus {
      display: flex;
      flex: none;
      flex-direction: row;

      height: 3rem;
      width: 3rem;

      background: #f6f6f6;
    }

    .node.app-tools > .tools-inner {
    }
  `;
}