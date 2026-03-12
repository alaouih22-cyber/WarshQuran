const CACHE_NAME = 'quran-warsh-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forza l'aggiornamento immediato
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
