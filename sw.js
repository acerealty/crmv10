// sw.js (for GitHub Pages project folder)
const CACHE = 'acecrm-static-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(clients.claim());
});

self.addEventListener('fetch', evt => {
  const req = evt.request;
  if (req.mode === 'navigate') {
    evt.respondWith(fetch(req).catch(()=> caches.match('./index.html')));
    return;
  }
  evt.respondWith(caches.match(req).then(res => res || fetch(req)));
});
