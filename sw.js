const staticAssets = ["./", "./styles.css", "./main.js"];

// cache static assets when service worker is installed
self.addEventListener("install", async (e) => {
  const cache = await caches.open("neumorphism-clock");
  cache.addAll(staticAssets);
});

// network call made
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req));
  }
});

const cacheFirst = async (req) => {
  // check the cache for current response
  const cachedResponse = await caches.match(req);

  // return cached content if it exists, else fetch from the network
  return cachedResponse || fetch(req);
};
