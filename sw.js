const CACHE_NAME = 'itrack-safe-v6';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) { return caches.delete(key); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.hostname.includes('script.google.com')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(function() { return fetch('./iTrack.html'); }));
    return;
  }
  event.respondWith(fetch(event.request).catch(function() { return caches.match(event.request); }));
});
