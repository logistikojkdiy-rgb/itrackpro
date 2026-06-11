const CACHE_NAME = 'itrack-pwa-android-ios-v7';

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

  /*
   * Jangan cache Google Apps Script/API.
   * Supaya data absensi, laporan, revisi, izin, peserta, dan admin selalu fresh.
   */
  if (
    url.hostname.includes('script.google.com') ||
    url.pathname.includes('/macros/s/')
  ) {
    return;
  }

  /*
   * Halaman utama pakai network-first.
   * Ini penting supaya update id.html cepat terbaca di Android dan iPhone.
   */
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(function() {
        return fetch('./id.html');
      })
    );
    return;
  }

  /*
   * Asset lain pakai network-first,
   * fallback ke cache jika offline.
   */
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
