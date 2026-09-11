'use strict';
(() => {
  const notice=document.getElementById('pwa-notice');
  const label=document.getElementById('pwa-status');
  const update=document.getElementById('pwa-update');
  let registration;
  function status(){
    const offline=!navigator.onLine;
    const waiting=!!registration?.waiting;
    notice.hidden=!offline&&!waiting;
    label.textContent=offline?'Anda offline. Pilihan masih boleh diteroka; WhatsApp memerlukan internet.':waiting?'Versi baharu tersedia. Pilihan sesi anda akan dikekalkan.':'';
    update.hidden=offline||!waiting;
  }
  window.addEventListener('online',status);
  window.addEventListener('offline',status);
  status();
  if(!('serviceWorker' in navigator)||!window.isSecureContext)return;
  let refreshing=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(refreshing)location.reload();
  });
  update.addEventListener('click',()=>{
    if(registration?.waiting){refreshing=true;registration.waiting.postMessage({type:'SKIP_WAITING'});}
  });
  window.addEventListener('load',async()=>{
    try{
      registration=await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});
      status();
      registration.addEventListener('updatefound',()=>{
        const worker=registration.installing;
        worker?.addEventListener('statechange',status);
      });
    }catch{
      if(navigator.onLine){notice.hidden=false;label.textContent='Mod offline belum tersedia. Anda masih boleh menggunakan laman ini secara online.';}
    }
  });
})();
