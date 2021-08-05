const FILES_TO_CACHE = [
    // list of files goes here
    // separate them by commas
    "/",
    "/index.js",
    "/manifest.webmanifest",
    "/styles.css",
    "/db.js",
    "\icons\icon-192x192.png",
    "\icons\icon-512x512.png",
    "webpack.config.js",
];

const PRECACHE = 'precache';
const RUNTIME = 'runtime';


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWait())
    );
});

self.addEventListener('activate', (event) => {
    const currentCache = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCache.includes(cacheName));
            })
            .then((deleteCache) => {
                return Promise.all(
                    deleteCache.map((deleteCache) => {
                        return caches.delete(deleteCache);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respond(
            caches.match(event.request).then((responseCache) => {
                if (responseCache) {
                    return responseCache;
                }

                return caches.open(RUNTIME).then((cache) => {
                    return fetch(event.request).then((response) => {
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});