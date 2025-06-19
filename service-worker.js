/* /singplay/service-worker.js */
const STATIC_CACHE   = 'singplay-static-v1';
const AUDIO_CACHE    = 'singplay-audio-v1';

/* Arquivos essenciais: interface, scripts, logo… */
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/script.js',
  './songs/songs.js',
  './audios/audios.js',
  './img/singplaylogo.png',
  './manifest.json'
];

/* ---------- INSTALL: pré‑cache de arquivos estáticos ---------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(c => c.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ---------- ACTIVATE: limpa versões antigas ---------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => ![STATIC_CACHE, AUDIO_CACHE].includes(k))
            .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ---------- FETCH: estratégia personalizada ---------- */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* === 1) ÁUDIOS (.mp3) – cache dinâmico  === */
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(cacheThenNetwork(request));
    return;
  }

  /* === 2) Demais arquivos – cache first === */
  event.respondWith(
    caches.match(request).then(
      cached => cached || fetch(request)
    )
  );
});

/* ---------- Função de cache dinâmico p/ áudio ---------- */
async function cacheThenNetwork(request) {
  const cache = await caches.open(AUDIO_CACHE);

  /* ➜ Removemos o cabeçalho Range da chave, para evitar múltiplas
       entradas “incompletas” para o MESMO arquivo                 */
  const cleanRequest = request.headers.has('range')
      ? requestCloneWithoutRange(request)
      : request;

  /* 1. Tenta cache */
  const cached = await cache.match(cleanRequest.url);
  if (cached) {
    /* Se o player pediu apenas um trecho (Range), entregamos o
       arquivo completo armazenado; o navegador lida com o corte  */
    return cached;
  }

  /* 2. Se não tem cache, baixa da rede e armazena */
  try {
    const networkResp = await fetch(request);
    cache.put(cleanRequest.url, networkResp.clone()); // salva original
    return networkResp;
  } catch (err) {
    /* 3. Offline e sem cache → erro genérico */
    return new Response('Offline e sem cache para este arquivo.',
                        { status: 503 });
  }
}

/* ---------- Helper: clona Request sem cabeçalho Range ---------- */
function requestCloneWithoutRange(req) {
  const headers = new Headers(req.headers);
  headers.delete('range');
  return new Request(req.url, {
    method: req.method,
    headers,
    mode: req.mode,
    credentials: req.credentials,
    redirect: req.redirect,
    referrer: req.referrer,
    integrity: req.integrity
  });
}
