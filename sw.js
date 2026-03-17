const CACHE_NAME = 'quran-premium-v2';

// File essenziali da salvare subito
const PRECACHE_ASSETS = [
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700&display=swap'
];

// Installazione
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// Attivazione e pulizia vecchia cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

// Gestione richieste (Cache-First per immagini e testi)
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Non cachare l'audio (troppo pesante, blocca la memoria)
  if (url.includes('everyayah.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        // Salva in cache se è una richiesta API o un'immagine del Mushaf
        if (url.includes('api.alquran.cloud') || url.includes('wp.com') || url.includes('wsrv.nl')) {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        }
        return response;
      });
    })
  );
});
