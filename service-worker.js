const cacheName = "LH-blog-12-10";

const myCache = [
  "/",
  "/offline.html",
  "/assets/built/screen.css"
];

// cache the application shell
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(myCache);
    }).catch((error) => {
      console.error(error);
    })
  );
});

self.addEventListener("fetch", (event) => {
  var requestURL = new URL(event.request.url);

  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }
      
      return fetch(event.request)
      .then((response) => {
        if (response.type === "opaque" || response.status === 404 || requestURL.origin !== location.origin || event.request.url.indexOf('/ghost/') !== -1 || event.request.url.indexOf('/p/') !== -1) {
          return response;
        }

        return caches.open(cacheName)
        .then((cache) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
    }).catch((error) => {
      console.error(error);
      return caches.match("offline.html");
    })
  );
});

// delete outdated caches in the activate event listener
self.addEventListener("activate", (event) => {
  var cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', (oEvent) => {
  const message = oEvent.data.text();
  console.info('[Service Worker] Push Received.');

  const title = 'The Man Cave';
  const options = {
    body: message
  };

  oEvent.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (oEvent) => {
  oEvent.notification.close();

  oEvent.waitUntil(
    clients.openWindow('https://blog.leonhassan.dev/')
  );
});
