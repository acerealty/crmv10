self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('ace-crm-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './ace-logo-192.png',
        './ace-logo-512.png',
        './manifest.webmanifest'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
