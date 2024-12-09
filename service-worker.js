// Le nom du cache
const CACHE_NAME = 'nina-carducci-cache-v1';

// Les fichiers à mettre en cache
const URLs_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/bootstrap/bootstrap.css',
  '/assets/style.css',
  '/assets/images/nina_11zon.webp',
  '/assets/images/slider/ryoji-iwata-wUZjnOv7t0g-unsplash_11zon.webp',
  '/assets/images/slider/nicholas-green-nPz8akkUmDI-unsplash_11zon.webp',
  '/assets/images/slider/edward-cisneros-3_h6-1NPDGw-unsplash_11zon.webp',
  '/assets/images/gallery/concerts/aaron-paul-wnX-fXzB6Cw-unsplash_11zon.webp',
  '/assets/images/gallery/entreprise/ali-morshedlou-WMD64tMfc4k-unsplash_11zon.webp',
  '/assets/images/gallery/entreprise/jason-goodman-tHO1_OuKbg0-unsplash_11zon.webp',
  '/assets/images/gallery/mariage/hannah-busing-RvF2R_qMpRk-unsplash_11zon.webp',
  '/assets/images/gallery/portraits/ade-tunji-rVkhWWZFAtQ-unsplash_11zon.webp',
  '/assets/images/gallery/mariage/jakob-owens-SiniLJkXhMc-unsplash_11zon.webp',
  '/assets/images/gallery/portraits/nino-van-prattenburg--443cl1uR_8-unsplash_11zon.webp',
  '/assets/images/gallery/concerts/austin-neill-hgO1wFPXl3I-unsplash_11zon.webp',
  '/assets/images/gallery/entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash_11zon.webp',
  '/assets/images/camera_11zon.webp',
  '/assets/scripts.js',
  '/assets/bootstrap/bootstrap.bundle.js',
  '/assets/maugallery.js', 
];

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installé');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Mise en cache des ressources');
      return cache.addAll(URLs_TO_CACHE);
    })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activé');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
