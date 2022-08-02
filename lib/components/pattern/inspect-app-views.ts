import { css } from 'lit';

export function InspectAppViews() {
  return css`
    /*  */
    .node.app-views {
      position: relative;

      display: flex;
      flex: 1;
      flex-direction: row;
    }

    .node.app-views > .app-views-plane:not([node-active]) {
      display: none;
      pointer-events: none;
    }

    .node.app-views > .app-views-plane {
      position: absolute;
      inset: 0rem 0rem;

      display: flex;
      flex-direction: column;
    }

    /*  */
    .node.app-views-navigation {
      display: flex;
      flex: none;
      flex-direction: row;

      width: min(75%, calc(100% - 1.25rem * 2));

      gap: 0.625rem;
      margin: 0rem auto 1.25rem auto;
      padding: 0rem 0rem;
    }

    /*  */
    .views-navigation-item {
      all: unset;

      display: flex;
      flex: auto;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      height: 2.5rem;

      margin: 0rem 0rem;
      padding: 0rem 0.625rem;

      cursor: pointer;
    }

    .views-navigation-item > span {
      flex: none;

      font-family: 'BreezeSans', 'Breeze Sans', 'ui-sans-serif', 'system-ui';
      font-size: 1rem;
      line-height: 1.25rem;

      letter-spacing: 0.012ch;
      font-weight: 500;
      color: #3a3a3a;

      border-top: 2.5px solid transparent;
      border-bottom: 2.5px solid currentColor;
    }

    .views-navigation-item:not([node-active]) > span {
      letter-spacing: 0.026ch;
      font-weight: 400;
      color: #909090;

      border-color: transparent;
    }
  `;
}
