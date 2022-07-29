import { Handlers } from '$fresh/server.ts';

import { PAGE, PageList } from '../../data/page.ts';

const DATA = {
  name: PAGE['_app'].name,
  short_name: PAGE['_app'].short_name,
  start_url: PAGE['_app'].og.url,
  display: 'standalone',
  display_override: ['standalone', 'window-controls-overlay'],
  background_color: '#f6f6f7',
  theme_color: '#f6f6f7',
  categories: ['games', 'education'],
  icons: [
    { src: '/inspect/assets/figure/512w/page.png', sizes: '512x512', type: 'image/png' },
    { src: '/inspect/assets/figure/512w/page-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],

  capture_links: 'existing-client-navigate',
  launch_handler: { route_to: 'existing-client-navigate' },
};

export const handler: Handlers = {
  GET: () => {
    return new Response(JSON.stringify(DATA), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  },
};
