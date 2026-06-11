const CACHE_NAME = 'itrack-pwa-safe-v5';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          return caches.delete(key);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Jangan cache Google Apps Script/API agar data absensi, laporan, peserta, dan aksi admin selalu fresh.
  if (url.hostname.includes('script.google.com')) {
    return;
  }

  // Network-first untuk halaman utama supaya iPhone/Android tidak nyangkut cache lama.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(function() {
        return fetch('./id.html');
      })
    );
    return;
  }

  // Asset lain: network-first, fallback cache jika tersedia.
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
