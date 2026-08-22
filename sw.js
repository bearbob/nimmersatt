const CACHE = 'nimmersatt-v2.2.5';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './version.js',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/icons/icon.svg',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg',
  './assets/icons/apple-touch-icon.svg',
  './data/books.js',
  './data/recipes.js',
  './data/bread.js',
  './data/recipes_en.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  // Do NOT skipWaiting here — the update toast handles that explicitly.
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

const IMAGE_CACHE = 'nimmersatt-images-v1';

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  if (e.request.destination === 'image') {
    e.respondWith(
      caches.open(IMAGE_CACHE).then(c =>
        c.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(res => {
            if (res.ok) c.put(e.request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res.ok && e.request.url.startsWith(self.location.origin)) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
