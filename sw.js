// 오프라인에서도 열리게 — 온라인이면 늘 새 판을 받고, 끊기면 저장해 둔 판을 쓴다
const C = 'cvt-mwgij4u6';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then((res) => { const copy = res.clone(); caches.open(C).then((c) => c.put(r, copy)); return res; }).catch(() => caches.match(r).then((m) => m || caches.match('./index.html'))));
});
