/* /singplay/service-worker.js */
const CACHE_NAME = 'singplay-cache-v1';

/* Arquivos que SEMPRE vamos pré‑armazenar (html, css, js, imagens)  */
const STATIC_ASSETS = [
  './',                     // página inicial
  './index.html',
  './css/styles.css',
  './js/script.js',
  './audios/audios.js',
  './songs/songs.js',
  // coloque aqui imagens que aparecem na 1ª tela
  // ex.: './img/logo.png'
];

/* INSTALAÇÃO: grava tudo em cache antes de o usuário ficar offline */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
          .then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();          // ativa o SW imediatamente
});

/* FETCH: primeiro tenta o cache; se não houver, busca na rede e guarda */
self.addEventListener('fetch', event => {
  const { request } = event;

  /* regra específica p/ áudio .mp3: faz cache “sob demanda” */
  if (request.url.endsWith('.mp3')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const cached = await cache.match(request);
        if (cached) return cached;         // já temos off‑line

        /* baixa da rede, grava no cache e devolve ao player  */
        const resp = await fetch(request);
        cache.put(request, resp.clone());
        return resp;
      })
    );
    return;   // evita cair na regra genérica
  }

  /* regra genérica para qualquer outro arquivo */
  event.respondWith(
    caches.match(request).then(
      resp => resp || fetch(request)
    )
  );
});
