/* ---------- QR codes ---------- */
const base=()=>location.href.split('#')[0];
function qrCanvas(text,px=8){const q=qrcode(0,'M');q.addData(text);q.make();const n=q.getModuleCount(),m=4,c=document.createElement('canvas');c.width=c.height=(n+m*2)*px;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.fillStyle='#14213D';for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(q.isDark(r,k))x.fillRect((k+m)*px,(r+m)*px,px,px);return c}
function showLink(title,url){const d=document.createElement('dialog');d.innerHTML=`<h3>${esc(title)}</h3><div style="text-align:center"></div><label>Link</label><input readonly value="${esc(url)}" onfocus="this.select()"><div class="row" style="margin-top:12px"><button class="btn" data-q="copy">Copy link</button><button class="btn sec" data-q="dl">Download QR</button><button class="btn sec" data-q="share">Share</button><button class="btn sec" data-q="x">Close</button></div>`;
 const c=qrCanvas(url);c.style.cssText='width:min(260px,100%);height:auto;border-radius:12px';d.querySelector('div').append(c);
 d.onclick=async e=>{const b=e.target.closest('[data-q]');if(!b)return;const k=b.dataset.q;if(k==='x')d.close();if(k==='copy'){try{await navigator.clipboard.writeText(url);b.textContent='Copied ✓'}catch(_){d.querySelector('input').select()}}if(k==='dl'){const a=document.createElement('a');a.href=c.toDataURL('image/png');a.download='vendora-qr.png';a.click()}if(k==='share'){if(navigator.share)navigator.share({title,url}).catch(()=>{});else b.textContent='Not supported here'}};
 d.onclose=()=>d.remove();document.body.append(d);d.showModal()}

/* ---------- notifications, badges, alerts ---------- */
function setBadge(n){S.badge=n;const b=$('#nb');if(b){b.hidden=!n;b.textContent=n>9?'9+':n}if('setAppBadge' in navigator){(n?navigator.setAppBadge(n):navigator.clearAppBadge()).catch(()=>{})}document.title=(n?`(${n}) `:'')+'VENDORA – Your Market. Your Store. Your Way.'}
async function refreshBadge(){let n=0;if(S.user){const{count}=await sb.from('notifications').select('id',{count:'exact',head:true}).eq('user_id',S.user.id).is('read_at',null);n+=count||0}
 const seen=+localStorage.vseen;if(!seen){localStorage.vseen=Date.now()}else{const iso=new Date(seen).toISOString();let ps=sb.from('products').select('id',{count:'exact',head:true}).eq('is_active',true).gt('created_at',iso),ss=sb.from('stores').select('id',{count:'exact',head:true}).eq('is_published',true).gt('created_at',iso);if(S.vendor){ps=ps.neq('vendor_id',S.vendor.id);ss=ss.neq('vendor_id',S.vendor.id)}const[{count:a},{count:b}]=await Promise.all([ps,ss]);n+=(a||0)+(b||0)}
 setBadge(n)}
function beep(){try{const c=S.ac||(S.ac=new(window.AudioContext||window.webkitAudioContext)()),t=c.currentTime;[[880,0],[1175,.15]].forEach(([f,d])=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=f;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(.0001,t+d);g.gain.exponentialRampToValueAtTime(.15,t+d+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d+.25);o.start(t+d);o.stop(t+d+.3)})}catch(e){}}
function notifDest(n){const r=S.profile?.role;if(n.link)return n.link.replace(/^#/,'');if(n.orders?.reference)return r==='vendor_admin'?'/vendor?t=orders':'/track?ref='+n.orders.reference;return r==='vendor_admin'?'/vendor?t=orders':'/notifications'}
function listen(){if(S.ch){sb.removeChannel(S.ch);S.ch=null}if(!S.user)return;S.ch=sb.channel('n-'+S.user.id).on('postgres_changes',{event:'INSERT',schema:'public',table:'notifications',filter:'user_id=eq.'+S.user.id},p=>onNotif(p.new)).subscribe()}
function onNotif(n){toast('🔔 '+n.title);if(navigator.vibrate)navigator.vibrate([120,60,120]);if(['vendor_admin','super_admin'].includes(S.profile?.role))beep();
 if('Notification' in window&&Notification.permission==='granted'&&document.hidden&&navigator.serviceWorker)navigator.serviceWorker.ready.then(r=>r.showNotification(n.title,{body:n.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:n.id,data:{url:base()+'#'+notifDest(n)}}));
 refreshBadge();if(!document.querySelector('dialog[open]')&&/^#\/(notifications|admin|account)$|^#\/vendor(\?t=(orders|overview|reviews)(&d=\d+)?)?$/.test(location.hash))route()}

async function notifications(){const uid=S.user?.id;let al=[];
 if(uid){const{data}=await sb.from('notifications').select('*,orders:order_id(reference)').eq('user_id',uid).order('created_at',{ascending:false}).limit(60);al=data||[]}
 const seen=+localStorage.vseen||Date.now();
 const[{data:ps},{data:ns}]=await Promise.all([sb.from('products').select('id,name,price,discount_price,created_at,vendor_id').eq('is_active',true).order('created_at',{ascending:false}).limit(12),sb.from('stores').select('slug,name,logo_url,city,created_at,vendor_id').eq('is_published',true).order('created_at',{ascending:false}).limit(6)]);
 let vm={};if(ps?.length){const{data:st}=await sb.from('stores').select('vendor_id,slug,name').in('vendor_id',[...new Set(ps.map(p=>p.vendor_id))]);vm=Object.fromEntries((st||[]).map(x=>[x.vendor_id,x]))}
 const mine=v=>S.vendor&&v===S.vendor.id,isNew=x=>new Date(x.created_at).getTime()>seen&&!mine(x.vendor_id);
 const ios=/iphone|ipad|ipod/i.test(navigator.userAgent),standalone=matchMedia('(display-mode:standalone)').matches||navigator.standalone;
 const perm='Notification' in window?Notification.permission:'unsupported';
 app.innerHTML=`<h2>🔔 Notifications</h2>
 <div class="card"><div class="row sp"><div><b>Phone alerts</b><div class="mut">${perm==='granted'?'On. You will get alerts while VENDORA is open or running in the background.':perm==='denied'?'Blocked in your browser settings.':perm==='unsupported'?'Not supported in this browser.':'Get a pop-up and sound when something happens.'}</div></div>${perm==='default'?'<button class="btn sm" data-act="enable">Turn on</button>':''}${S.inst?'<button class="btn sec sm" data-act="install">⬇ Install app</button>':''}</div>${ios&&!standalone?'<p class="mut" style="margin-bottom:0">iPhone: tap the Share icon, then “Add to Home Screen” to install VENDORA and enable alerts.</p>':''}</div>
 ${uid?`<h3>Your alerts</h3>${al.length?al.map(n=>`<a class="card row sp ${n.read_at?'':'unread'}" style="color:inherit" href="#${notifDest(n)}"><span><b>${esc(n.title)}</b>${n.body?`<div class="mut">${esc(n.body)}</div>`:''}</span><span class="mut">${dt(n.created_at)}</span></a>`).join(''):'<div class="card empty">No alerts yet. Order updates, replies and platform news show up here.</div>'}`:'<div class="card empty"><a href="#/login">Log in</a> to get order and account alerts.</div>'}
 <h3>✨ What's new</h3><div class="grid">${(ns||[]).map(x=>`<a class="card" style="color:inherit;text-align:center" href="#/s/${esc(x.slug)}">${isNew(x)?'<span class="badge w">NEW STORE</span>':''}<div style="margin:6px 0"><img class="logo" ${x.logo_url?`src="${esc(x.logo_url)}"`:''} alt=""></div><b style="color:var(--head)">${esc(x.name)}</b><div class="mut">${esc(x.city||'')}</div></a>`).join('')}${(ps||[]).map(x=>{const st=vm[x.vendor_id];return `<a class="card" style="color:inherit" href="#/s/${st?esc(st.slug):''}">${isNew(x)?'<span class="badge w">NEW</span> ':''}<b style="color:var(--head)">${esc(x.name)}</b><div class="mut">${st?esc(st.name):''}</div><b>${money(x.discount_price??x.price)}</b></a>`}).join('')||''}</div>${!ns?.length&&!ps?.length?'<div class="card empty">Nothing new yet.</div>':''}`;
 localStorage.vseen=Date.now();
 if(uid&&al.some(n=>!n.read_at))await sb.from('notifications').update({read_at:new Date().toISOString()}).eq('user_id',uid).is('read_at',null);
 refreshBadge()}

/* ---------- PWA ---------- */
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol)){const had=!!navigator.serviceWorker.controller;let reloading=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!had||reloading)return;reloading=true;location.reload()});
 const offer=reg=>{if(!reg.waiting||!navigator.serviceWorker.controller||$('#upd'))return;const b=document.createElement('div');b.id='upd';b.innerHTML='<span>A new version of VENDORA is ready.</span><button class="btn sm" id="updgo">Update now</button>';document.body.append(b);$('#updgo').onclick=()=>reg.waiting.postMessage('SKIP_WAITING')};
 addEventListener('load',()=>navigator.serviceWorker.register('sw.js').then(reg=>{offer(reg);reg.addEventListener('updatefound',()=>{const w=reg.installing;if(w)w.addEventListener('statechange',()=>{if(w.state==='installed')offer(reg)})});setInterval(()=>reg.update().catch(()=>{}),3600000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)reg.update().catch(()=>{})})}).catch(()=>{}))}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();S.inst=e;drawNav()});
addEventListener('appinstalled',()=>{S.inst=null;drawNav();toast('VENDORA installed 🎉')});
const offBar=()=>{let b=$('#off');if(!b){b=document.createElement('div');b.id='off';b.textContent='You are offline. Orders and payments need a connection.';document.body.prepend(b)}b.hidden=navigator.onLine};
addEventListener('online',()=>{offBar();route()});addEventListener('offline',offBar);offBar();

