//asignar un nombre y versión al cache
const CACHE_NAME = "aprendejs-cache",
  urlsToCache = [
    "./",
    "./index.html",
    "./assets/index.js",
    "./assets/style.css",
    "./assets/favicon.png",
    "./assets/articulo.svg",
    "./assets/codigo.svg",
    "./assets/video.svg",
    "./assets/kEnAi.svg",
    "./assets/apoyo.jpg",
    "./assets/patreon.svg",
    "./assets/paypal.svg",
    "./assets/ko-fi.svg",
    "https://fonts.gstatic.com/s/raleway/v16/1Ptrg8zYS_SKggPNwK4vWqZPANqczVs.woff2",
    "https://fonts.gstatic.com/s/raleway/v16/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2",
    "https://fonts.googleapis.com/css2?family=Raleway:wght@400;900&display=swap",
    "https://www.googletagmanager.com/gtag/js?id=UA-177774803-1",
  ];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Falló registro de cache", err))
  );
});

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  );
});

//cuando el navegador recupera una url
self.addEventListener("fetch", (e) => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        //recuperar del cache
        return res;
      }
      //recuperar de la petición a la url
      return fetch(e.request);
    })
  );
});
