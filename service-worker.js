// Service Worker — App Shell + Network-First Strategy
const CACHE_NAME = 'chinmay-portfolio-v4';
const APP_SHELL = [
    '/',
    '/index.html',
    '/main_profile.jpg',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/gemini-spark.html',
    '/strategic-playbook.html'
];

const OFFLINE_PAGE = '/index.html';

// Install: Pre-cache app shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Pre-caching app shell');
                return cache.addAll(APP_SHELL);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Network-first for HTML, Cache-first for assets
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and ALL cross-origin requests
    if (request.method !== 'GET') return;
    if (url.origin !== location.origin) return;

    // HTML pages: Network-first
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    return response;
                })
                .catch(() => caches.match(request).then(cached => cached || caches.match(OFFLINE_PAGE)))
        );
        return;
    }

    // PDFs: Network-first with cache fallback
    if (url.pathname.endsWith('.pdf')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // All other assets (images, fonts, CSS, JS): Cache-first
    event.respondWith(
        caches.match(request)
            .then(cached => {
                if (cached) return cached;
                return fetch(request).then(response => {
                    // Only cache successful responses
                    if (!response || response.status !== 200) return response;
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    return response;
                });
            })
            .catch(() => {
                // Fallback for images
                if (request.headers.get('accept')?.includes('image')) {
                    return new Response(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#14161b" width="200" height="200"/><text fill="#a8c7fa" x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="14">Offline</text></svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                }
            })
    );
});
