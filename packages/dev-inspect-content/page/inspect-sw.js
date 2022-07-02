const cacheName = 'inspect:861057';
const appShellFiles = [
  '/inspect/twitch-elements/custom-elements-es5-adapter.js', //
  '/inspect/twitch-elements/index.html',
  '/inspect/twitch-elements/',
];

self.addEventListener('install', (e) => {
  console.debug('[Service Worker] Install');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.debug('[Service Worker] Caching all: app shell and content');
      await cache.addAll(appShellFiles);
    })()
  );
});

self.addEventListener('fetch', (e) => {
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.debug(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;

      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.debug(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
