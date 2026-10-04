// Меняйте версию при каждом обновлении игры, чтобы браузер скачал новую версию
const CACHE_NAME = 'chayka17-v1';

// Список файлов для кэширования
const urlsToCache = [
  './',
  './chayka17.html',
  'https://i.postimg.cc/NfXT586g/IMG-3250.jpg' // Ваш логотип
];

// Установка: сохраняем все файлы в кэш
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Кэширую файлы...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация: удаляем старые версии кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаляю старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Перехват запросов: сначала ищем в кэше, потом в сети
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Если файл есть в кэше — отдаём его
        if (response) {
          return response;
        }
        // Иначе загружаем из сети
        return fetch(event.request);
      })
  );
});