// Basic Service Worker (cache-first)
const CACHE_NAME = 'rizzcode-cache-v1';
const OFFLINE_URLS = [
    '/',
    '/index.html',
    '/style.css',
    '/sidebar.js',
    '/logo.svg',
    // add other resources as needed
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(OFFLINE_URLS);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});
