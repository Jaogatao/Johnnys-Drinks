const CACHE_NAME = 'Johnnys-drinks-pwa';
const urlsToCache = [
  '/utm=pwa',
  '/styles.css',
  '/sw.js',
  '/manifest.json',
  '/caipirinha de limão.png',
  '/drink.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('Johnnys-drinks-pwa') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Service Worker registrado com sucesso
    }, function(err) {
      // Falha ao registrar o Service Worker
    });
  });
}

