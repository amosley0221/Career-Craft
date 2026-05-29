const CACHE_NAME = 'career-craft-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/explore.html',
  '/advice.html',
  '/resume.html',
  '/agent.html',
  '/degree-path.html',
  '/degree-finder.html',
  '/command-center.html',
  '/launch-plan.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/explore.js',
  '/js/advice.js',
  '/js/resume.js',
  '/js/agent.js',
  '/js/degree-path.js',
  '/js/degree-finder.js',
  '/js/command-center.js',
  '/js/launch-plan.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME; })
             .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request).then(function(response) {
        if (response.ok && event.request.method === 'GET') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      });
    }).catch(function() {
      if (event.request.destination === 'document') {
        return caches.match('/index.html');
      }
    })
  );
});
