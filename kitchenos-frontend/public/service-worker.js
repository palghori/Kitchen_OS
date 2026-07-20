const CACHE_NAME = 'kds-v1';
const urlsToCache = [
  '/kds',
  '/favicon.ico',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Serve from cache if found (Offline Mode)
        }
        return fetch(event.request);
      })
  );
});
