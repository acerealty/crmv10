const CACHE = 'acecrm-static-v1';
const ASSETS = [
  '/crmv10/',                 // root of your project
  '/crmv10/index.html',
  '/crmv10/manifest.webmanifest',
  '/crmv10/icons/icon-192.png',
  '/crmv10/icons/icon-512.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(clients.claim());
});

self.addEventListener('fetch', evt => {
  const req = evt.request;

  // For page navigation: network → fallback to cached index
  if (req.mode === 'navigate') {
    evt.respondWith(
      fetch(req).catch(() => caches.match('/crmv10/index.html'))
    );
    return;
  }

  // Other files: cache → network
  evt.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});
