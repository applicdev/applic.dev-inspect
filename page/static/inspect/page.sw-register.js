if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/inspect/page.sw.js', { scope: '/inspect/' });
}
