const CACHE_NAME = 'quran-v3'; // Cambiato da v2 a v3
const assets = ['index.html', 'manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting(); // Forza l'attivazione immediata
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
