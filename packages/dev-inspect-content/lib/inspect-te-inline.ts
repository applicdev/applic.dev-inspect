globalThis.addEventListener('', async () => {
  const nav = globalThis.navigator as any;

  if ('serviceWorker' in nav) {
    await nav.serviceWorker //
      .register('/inspect/inspect-sw.js', { scope: '/inspect/' })
      .catch(() => {});
  }
});
