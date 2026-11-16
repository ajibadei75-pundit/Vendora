/* VENDORA service worker: app-shell caching + notification clicks.
   Live data (Supabase) is never cached, so orders and payments are always fresh. */
const V = 'vendora-v1.1.0';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)));
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('vendora-') && k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.hostname.endsWith('supabase.co') || u.hostname.endsWith('openstreetmap.org')) return; // live data + map tiles: network only

  // Page loads: network first, fall back to the cached shell when offline
  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r).then(res => { const copy = res.clone(); caches.open(V).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Own files + pinned CDN libraries/fonts: stale-while-revalidate
  const cdn = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'].includes(u.hostname);
  if (u.origin === location.origin || cdn) {
    e.respondWith(
      caches.match(r).then(hit => {
        const net = fetch(r).then(res => {
          if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(V).then(c => c.put(r, copy)); }
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './#/notifications';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncached: true }).then(list => {
      for (const c of list) { if ('focus' in c) { c.focus(); if (c.navigate) c.navigate(url); return; } }
      return self.clients.openWindow(url);
    })
  );
});
