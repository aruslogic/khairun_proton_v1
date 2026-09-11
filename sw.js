'use strict';
// Bump RELEASE after every change to a precached file.
const RELEASE='2026-09-11.1';
const PREFIX='khairun-proton:'+self.registration.scope+':';
const CACHE=PREFIX+RELEASE;
const ASSETS=['./','index.html','app.js','catalog.js','pwa.js','style.css','khairun.css','manifest.json','assets/khairun.jpg','assets/aruslogic.png','assets/saga.png','assets/s70.png','assets/x50.png','assets/x70.png','assets/x90.png','assets/icon-192.png','assets/icon-512.png','assets/icon-maskable-512.png','assets/apple-touch-icon.png'];
const URLS=new Set(ASSETS.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  // Never intercept WhatsApp, third-party requests, or another project on this host.
  if(!url.href.startsWith(self.registration.scope))return;
  const clean=new URL(url);clean.search='';clean.hash='';
  if(!URLS.has(clean.href))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    // One complete release stays together; updates activate only when the user agrees.
    const cached=await cache.match(clean.href);
    return cached||fetch(request);
  })());
});
