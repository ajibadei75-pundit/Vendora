const SB_URL='https://ezgdzfjccddzkzjotwbs.supabase.co',SB_KEY='sb_publishable_wMHXklIfcXL3ghw7AJdU3g_eVOqDaGp';
const sb=supabase.createClient(SB_URL,SB_KEY);
const $=(s,e=document)=>e.querySelector(s),app=$('#app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'₦'+Number(n||0).toLocaleString('en-NG');
const dt=d=>d?new Date(d).toLocaleString('en-NG',{dateStyle:'medium',timeStyle:'short'}):'';
const FONTS=['Inter','Poppins','Montserrat','Roboto','Lato','Nunito','Playfair Display','DM Sans','Raleway','Open Sans','Merriweather','Work Sans'];
const STEPS=['awaiting_payment','payment_confirmed','accepted','preparing','dispatched','out_for_delivery','delivered'];
const LBL={pending_confirmation:'Pending confirmation',awaiting_payment:'Awaiting payment',payment_submitted:'Payment submitted',payment_confirmed:'Payment confirmed',accepted:'Accepted',preparing:'Preparing',ready_for_pickup:'Ready for pickup',dispatched:'Dispatched',out_for_delivery:'Out for delivery',delivered:'Delivered',cancelled:'Cancelled',refunded:'Refunded'};
const APP_VERSION='1.2.0';
const S={user:null,profile:null,vendor:null,store:null,settings:{}};
let carts=JSON.parse(localStorage.vcarts||'{}');const saveCarts=()=>localStorage.vcarts=JSON.stringify(carts);


/* ---------- professional icon set (inline SVG) ---------- */
const P={
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>',
starfill:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" fill="currentColor"/>',
sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16z"/>',
bag:'<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17h5l3-8h3"/><path d="M14 9l-2-3h-2"/>',
building:'<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
moon:'<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',
gamepad:'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10.5v4M5 12.5h4M16 11.5h.01M18.5 13.5h.01"/>',
download:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
bell:'<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4l2-2z"/><path d="M10 21a2 2 0 004 0"/>',
store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0"/><path d="M5 12v8h14v-8"/><path d="M10 20v-5h4v5"/>',
package:'<path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
chat:'<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
phone2:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
compass:'<path d="M3 11l18-8-8 18-2-8-8-2z"/>',
home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
alert:'<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18h.01"/>',
checkcircle:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',
eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
square:'<rect x="4" y="4" width="16" height="16" rx="3"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
palette:'<path d="M12 3a9 9 0 100 18c1.5 0 2-1 1.5-2-.6-1.2.2-2.5 1.6-2.5H17a4 4 0 004-4c0-5-4-9.5-9-9.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
medal:'<circle cx="12" cy="15" r="5.5"/><path d="M8.7 10.2L6.5 3h4l1.5 4M15.3 10.2L17.5 3h-4L12 7"/>',
letters:'<path d="M3 18L8 5l5 13M4.8 14h6.4M15 18v-6a3 3 0 016 0v6M15 15h6"/>',
hash:'<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>',
cards:'<rect x="4" y="5" width="11" height="15" rx="2"/><path d="M18 8v11a2 2 0 01-2 2H8"/>',
help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5M12 17h.01"/>',
bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
wheel:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7M12 14v7M3 12h7M14 12h7M5.6 5.6l4.9 4.9M13.5 13.5l4.9 4.9M18.4 5.6l-4.9 4.9M10.5 13.5l-4.9 4.9"/>',
trophy:'<path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3M12 14v4M8 21h8M10 18h4"/>',
tri:'<path d="M4 6h16L12 19 4 6z" fill="currentColor"/>'};
Object.assign(P,{
utensils:'<path d="M6 3v7a2 2 0 002 2v9M10 3v7a2 2 0 01-2 2M8 3v9"/><path d="M17 3c-2 1.5-3 4-3 7h3v11"/>',
gem:'<path d="M6 4h12l3 5-9 11L3 9l3-5z"/><path d="M3 9h18M9 4l-2 5 5 11 5-11-2-5"/>',
shirt:'<path d="M8 3l-5 3 2 4 3-1v11h8V9l3 1 2-4-5-3a4 4 0 01-8 0z"/>',
laptop:'<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
basket:'<path d="M4 10h16l-1.5 9h-13L4 10z"/><path d="M8 10l3-6M16 10l-3-6"/>',
briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
chart:'<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-7"/>',
image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 9"/>',
video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
tag:'<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
edit:'<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
upload:'<path d="M12 16V5M7 9l5-5 5 5M5 20h14"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 015 5"/>',
receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z"/><path d="M9 8h6M9 12h6"/>',
link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
wallet:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
truck:'<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
back:'<path d="M15 5l-7 7 7 7"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',
sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
refresh:'<path d="M20 11a8 8 0 10-2 6"/><path d="M20 4v7h-7"/>',
dot:'<circle cx="12" cy="12" r="5" fill="currentColor"/>'});
const ic=(n,c='')=>`<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||''}</svg>`;
const EMO={'⭐':'starfill|gold','★':'starfill|gold','☆':'star|muted','✨':'sparkle','🎉':'sparkle','🛍':'bag','🛵':'bike','🏬':'building','🕒':'clock','⏱':'clock','📍':'pin','☀':'sun','🌙':'moon','🎮':'gamepad','⬇':'download','🔔':'bell','🏪':'store','📦':'package','⚙':'gear','👤':'user','🧍':'user','✓':'check','✔':'check','✖':'x','✅':'checkcircle','⬜':'square','🗺':'map','💬':'chat','📞':'phone','📱':'phone2','🧭':'compass','🏠':'home','⚠':'alert','👋':'','💳':'card','👀':'eye','🎨':'palette','🥇':'medal|m-gold','🥈':'medal|m-silver','🥉':'medal|m-bronze','🔤':'letters','🔢':'hash','🃏':'cards','🧠':'help','❓':'help','💡':'bulb','🎡':'wheel','🏆':'trophy','🔻':'tri'};
const EMO_SRC='('+Object.keys(EMO).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')\uFE0F?';
const EMO_SPLIT=new RegExp(EMO_SRC,'g'),EMO_TEST=new RegExp(EMO_SRC);
const SKIP=/^(TEXTAREA|SCRIPT|STYLE|OPTION|TITLE|INPUT)$/;
function swapEmoji(n){const par=n.parentNode;if(!par||SKIP.test(par.nodeName)||!EMO_TEST.test(n.nodeValue))return;const parts=n.nodeValue.split(EMO_SPLIT),f=document.createDocumentFragment();
 parts.forEach((t,i)=>{if(i%2===0){if(t)f.append(document.createTextNode(t))}else{const[nm,cl]=(EMO[t]||'').split('|');if(nm){const tp=document.createElement('template');tp.innerHTML=ic(nm,cl||'');f.append(tp.content)}}});par.replaceChild(f,n)}
function iconize(root){if(root.nodeType===3)return swapEmoji(root);if(root.nodeType!==1)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),L=[];let x;while(x=w.nextNode())if(EMO_TEST.test(x.nodeValue))L.push(x);L.forEach(swapEmoji)}
new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')swapEmoji(m.target);else m.addedNodes.forEach(iconize)}}).observe(document.body,{childList:true,subtree:true,characterData:true});

/* ---------- utils ---------- */
let tt;function toast(m,bad){const t=$('#toast');t.textContent=m;t.style.background=bad?'var(--bad)':'';t.style.color=bad?'#fff':'';t.style.display='block';clearTimeout(tt);tt=setTimeout(()=>t.style.display='none',3800)}
async function run(fn){try{return await fn()}catch(e){toast(e.message||String(e),true)}}
const sk='<div class="sk"></div>'.repeat(4);
const waNum=n=>{let d=String(n||'').replace(/\D/g,'');if(d.startsWith('0'))d='234'+d.slice(1);return d};
const waLink=(n,msg)=>`https://wa.me/${waNum(n)}?text=${encodeURIComponent(msg)}`;
const badge=s=>`<span class="badge ${['cancelled','refunded','suspended','rejected'].includes(s)?'b':['pending','awaiting_payment','payment_submitted'].includes(s)?'w':''}">${esc(LBL[s]||s)}</span>`;
function ask(title,fields,ok='Save'){return new Promise(res=>{const d=document.createElement('dialog');d.innerHTML=`<form method="dialog"><h3>${esc(title)}</h3>${fields.map(f=>`<label>${esc(f.l)}${f.t==='select'?`<select name="${f.n}">${f.o.map(o=>`<option>${esc(o)}</option>`).join('')}</select>`:f.t==='textarea'?`<textarea name="${f.n}" rows="3">${esc(f.v||'')}</textarea>`:`<input name="${f.n}" type="${f.t||'text'}" value="${esc(f.v||'')}" ${f.r?'required':''} ${f.a||''}>`}</label>`).join('')}<div class="row" style="margin-top:14px"><button class="btn sec" value="x" formnovalidate>Cancel</button><button class="btn" value="ok">${ok}</button></div></form>`;document.body.append(d);d.showModal();d.onclose=()=>{const v=d.returnValue==='ok'?Object.fromEntries(new FormData(d.querySelector('form'))):null;d.remove();res(v)}})}
const IMG_OK=/^image\/(png|jpe?g|webp|svg\+xml)$/,VID_OK=/^video\/(mp4|webm|quicktime)$/;
async function upload(bucket,path,file,{video=false}={}){if(!file||!file.size)return null;
 if(video){if(!VID_OK.test(file.type))throw new Error('Video must be MP4, WebM or MOV');if(file.size>40*1048576)throw new Error('Video must be under 40 MB')}
 else if(!IMG_OK.test(file.type)&&!(bucket==='receipts'&&file.type==='application/pdf'))throw new Error('Allowed: PNG, JPG, WebP'+(bucket==='receipts'?', PDF':', SVG'));
 else if(file.size>5*1048576)throw new Error('Pictures must be under 5 MB');
 const{error}=await sb.storage.from(bucket).upload(path,file,{upsert:true,contentType:file.type});if(error)throw error;return bucket==='store-assets'?sb.storage.from(bucket).getPublicUrl(path).data.publicUrl:path}
const ext=f=>(f.name.split('.').pop()||'png').toLowerCase().replace(/[^a-z0-9]/g,'');
const rid=()=>crypto.randomUUID();
const fd=f=>Object.fromEntries(new FormData(f));
function css(store){const s=store._s||{};return `--pri:${s.primary_color||'#15966B'};--head:${s.secondary_color||'#14213D'};--sf:'${FONTS.includes(s.font_family)?s.font_family:'Inter'}'`}


/* ---------- logo-derived brand colours ---------- */
async function logoColors(url,fb){if(!url)return fb;const k='lc_'+url;if(sessionStorage[k])return JSON.parse(sessionStorage[k]);
 try{const img=new Image();img.crossOrigin='anonymous';img.src=url;await img.decode();const c=document.createElement('canvas');c.width=c.height=48;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,48,48);const d=x.getImageData(0,0,48,48).data,B={};
  for(let i=0;i<d.length;i+=4){if(d[i+3]<128)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mn>228||mx<28)continue;const key=(r>>4)+','+(g>>4)+','+(b>>4),e=B[key]||(B[key]={n:0,r:0,g:0,b:0,s:0});e.n++;e.r+=r;e.g+=g;e.b+=b;e.s+=(mx-mn)/mx}
  const L=Object.values(B).map(e=>({r:e.r/e.n,g:e.g/e.n,b:e.b/e.n,w:e.n*(.35+e.s/e.n)})).sort((a,b)=>b.w-a.w);if(!L.length)return fb;
  const hx=o=>'#'+[o.r,o.g,o.b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''),p=L[0],q=L.find(o=>Math.hypot(o.r-p.r,o.g-p.g,o.b-p.b)>90)||{r:p.r*.45,g:p.g*.45,b:p.b*.45};
  const res={c1:hx(p),c2:hx(q)};sessionStorage[k]=JSON.stringify(res);return res}catch(e){return fb}}
const lum=h=>{const n=parseInt(h.slice(1),16);return(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255};
const inkFor=c=>(lum(c.c1)+lum(c.c2))/2>.6?'#14213D':'#fff';
const fbCols=st=>({c1:st?._s?.primary_color||'#15966B',c2:st?._s?.secondary_color||'#14213D'});
function closeWelcome(){const o=$('#welcome');if(!o)return;o.classList.add('out');document.body.style.overflow='';setTimeout(()=>o.remove(),520)}
async function showWelcome(st,n,hours,force){if(!force&&sessionStorage['seen_'+st.slug])return;
 const col=await Promise.race([logoColors(st.logo_url,fbCols(st)),new Promise(r=>setTimeout(()=>r(null),900))])||fbCols(st);const s=st._s||{};
 const o=document.createElement('div');o.id='welcome';o.setAttribute('role','dialog');o.setAttribute('aria-label','Welcome to '+st.name);
 o.style.cssText=`--w1:${col.c1};--w2:${col.c2};--wi:${inkFor(col)};font-family:'${FONTS.includes(s.font_family)?s.font_family:'Inter'}',Inter,sans-serif`;
 o.innerHTML=`<i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><div class="wc"><div class="ring"><div class="wl">${st.logo_url?`<img src="${esc(st.logo_url)}" alt="${esc(st.name)} logo">`:`<span>${esc((st.name||'V')[0].toUpperCase())}</span>`}</div></div>
 <p class="wk">Welcome to</p><h1>${esc(st.name)}</h1>${st.tagline?`<p class="wt">${esc(st.tagline)}</p>`:''}
 <div class="wchips">${st.rating_count?`<span class="wchip">⭐ ${st.rating_avg} · ${st.rating_count} review${st.rating_count>1?'s':''}</span>`:'<span class="wchip">✨ New on VENDORA</span>'}${n?`<span class="wchip">🛍️ ${n} item${n>1?'s':''}</span>`:''}${st.vendor_delivery_enabled?`<span class="wchip">🛵 ~${st.estimated_delivery_minutes} min</span>`:''}${st.pickup_enabled?'<span class="wchip">🏬 Pickup</span>':''}${hours?`<span class="wchip">🕒 ${esc(hours)}</span>`:''}${st.city?`<span class="wchip">📍 ${esc(st.city)}</span>`:''}</div>
 <button class="wb" id="wenter">Enter store →</button>${st.whatsapp_number?`<a class="wa" target="_blank" rel="noopener" href="${waLink(st.whatsapp_number,'Hello '+st.name+', I found you on VENDORA.')}">or chat with us on WhatsApp</a>`:''}</div>`;
 document.body.append(o);document.body.style.overflow='hidden';const go=()=>{sessionStorage['seen_'+st.slug]=1;closeWelcome()};$('#wenter').onclick=go;$('#wenter').focus();o.onkeydown=e=>{if(e.key==='Escape')go()}}

/* ---------- maps (Leaflet + OpenStreetMap) ---------- */
const NG=[7.3775,3.9470];
const hav=(a,b,c,d)=>{const t=x=>x*Math.PI/180,h=Math.sin(t(c-a)/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(t(d-b)/2)**2;return 12742*Math.asin(Math.sqrt(h))};
const pin=e=>L.divIcon({html:`<div class="pin">${e}</div>`,className:'',iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-20]});
function clearMaps(){(S.maps||[]).forEach(m=>{try{m.remove()}catch(e){}});S.maps=[]}
function newMap(id,c,z=13){const m=L.map(id,{scrollWheelZoom:false}).setView(c,z);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(m);(S.maps=S.maps||[]).push(m);setTimeout(()=>m.invalidateSize(),80);return m}
async function geocode(q){const r=await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ng&q='+encodeURIComponent(q));return(await r.json())[0]}
async function reverse(la,ln){const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&lat=${la}&lon=${ln}`);return(await r.json()).address||{}}

/* ---------- theme (day / night) ---------- */
function setTheme(t,save=true){document.documentElement.dataset.theme=t;localStorage.vtheme=t;$('meta[name=theme-color]').content=t==='dark'?'#080d19':'#14213D';const b=$('#themebtn');if(b)b.innerHTML=ic(t==='dark'?'sun':'moon');if(save&&S.user)sb.from('profiles').update({theme:t}).eq('id',S.user.id).then(()=>{})}
setTheme(localStorage.vtheme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'),false);

/* ---------- session / nav ---------- */
async function loadSession(){const{data:{session}}=await sb.auth.getSession();S.user=session?.user||null;S.profile=S.vendor=S.store=null;
 if(S.user){const{data:p}=await sb.from('profiles').select('*').eq('id',S.user.id).single();S.profile=p;if(p?.theme&&p.theme!=='system'&&!localStorage.vtheme)setTheme(p.theme,false);
  if(p?.role==='vendor_admin'){const{data:v}=await sb.from('vendors').select('*').eq('owner_id',S.user.id).single();S.vendor=v;const{data:st}=await sb.from('stores').select('*,store_settings(*)').eq('vendor_id',v.id).single();if(st){st._s=st.store_settings;S.store=st}}}
 drawNav();listen();refreshBadge()}
function drawNav(){const r=S.profile?.role;
 const L=[['#/','Stores','store'],['#/track','Track order','package'],['#/play','Play','gamepad']];
 if(r==='super_admin')L.push(['#/admin','Admin','shield']);if(r==='vendor_admin')L.push(['#/vendor','My store','gear']);if(S.user)L.push(['#/account','Account','user']);
 $('#nav').innerHTML=L.map(l=>`<a class="hide-m" data-nav="${l[0]}" href="${l[0]}">${ic(l[2])}${l[1]}</a>`).join('')+(S.user?'<button data-act="logout" class="hide-m">Log out</button>':'<a href="#/login">Log in</a>')+(S.inst?'<button data-act="install" aria-label="Install the app">'+ic('download')+'</button>':'')+'<a href="#/notifications" class="bell" aria-label="Notifications">'+ic('bell')+'<i id="nb" class="nb" hidden></i></a><button id="themebtn" data-act="theme" aria-label="Toggle day and night mode"></button>';setBadge(S.badge||0);
 setTheme(document.documentElement.dataset.theme,false);
 const M=r==='super_admin'?['#/admin','shield','Admin']:r==='vendor_admin'?['#/vendor','gear','My store']:['#/signup','sparkle','Join'];
 $('#bot').innerHTML=[['#/','store','Stores'],['#/track','package','Track'],['#/play','gamepad','Play'],M,[S.user?'#/account':'#/login','user',S.user?'Account':'Log in']].map(l=>`<a data-nav="${l[0]}" href="${l[0]}"><b>${ic(l[1])}</b>${l[2]}</a>`).join('');markNav()}
function markNav(){const h=location.hash||'#/',k='#/'+h.slice(2).split(/[/?]/)[0],top=['#/s','#/checkout','#/pay'].includes(k)||h==='#/'||h===''?'#/':k;document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===top))}
sb.auth.onAuthStateChange((e,ses)=>{if(e==='SIGNED_IN'&&ses?.user?.id===S.user?.id)return;if(['SIGNED_IN','SIGNED_OUT'].includes(e))setTimeout(async()=>{await loadSession();route()},0)});

/* ---------- actions (event delegation) ---------- */
const ACT={
 theme:()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'),
 logout:async()=>{await sb.auth.signOut();location.hash='#/';toast('Logged out')},
 prevw:()=>{sessionStorage.removeItem('seen_'+S.store.slug);location.hash='#/s/'+S.store.slug},
 install:async()=>{if(!S.inst)return;S.inst.prompt();await S.inst.userChoice;S.inst=null;drawNav()},
 qr:el=>showLink(el.dataset.n,base()+'#/s/'+el.dataset.slug),
 qrl:el=>showLink('Invitation link (single use)',el.dataset.u),
 qrme:()=>showLink(S.vendor.business_name,base()+'#/s/'+S.store.slug),
 dsp:async el=>{const{error}=await sb.from('order_disputes').update({status:el.dataset.s}).eq('id',el.dataset.id);if(error)throw error;toast('Updated');route()},
 mod:async el=>{const{error}=await sb.from('reviews').update({status:el.dataset.s,moderated_by:S.user.id}).eq('id',el.dataset.id);if(error)throw error;toast('Review '+el.dataset.s);route()},
 enable:async()=>{if(!('Notification' in window))return toast('This browser does not support alerts',true);const r=await Notification.requestPermission();toast(r==='granted'?'Phone alerts are on ✓':'Alerts are blocked. Enable them in your browser settings.',r!=='granted');route()},
 copy:async el=>{await navigator.clipboard.writeText(el.dataset.v);toast('Copied')}
};
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const f=ACT[el.dataset.act];if(f){e.preventDefault();run(()=>f(el))}});
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-submit]');if(!f)return;e.preventDefault();const b=f.querySelector('button:not([type=button])');if(b)b.disabled=true;run(()=>ACT[f.dataset.submit](f)).finally(()=>{if(b)b.disabled=false})});


/* ---------- business types: each type gets its own labels, fields and defaults ---------- */
const BIZ={
 food:{n:'Food & Drinks',ic:'utensils',cat:'Menu',one:'dish',add:'Add a dish',pt:'food',stock:false,deliv:true,prep:true,addons:true,pers:false,pre:true,instr:true,vl:'Portions & sizes',vp:'e.g. Large',verb:'Start preparing',done:'Mark delivered',dl:'Delivery & kitchen',
  f:[['ingredients','Ingredients','text','e.g. Rice, tomato, pepper'],['spice','Spice level','sel','Mild,Medium,Hot,Extra hot'],['days','Available days','text','e.g. Mon to Sat'],['serves','Serves','text','e.g. 1 person']],
  tips:['Add Small, Medium and Large as portions so customers pick their size.','Use add-ons for extras such as chicken or plantain. They are priced by the server, never by the browser.','Turn on pre-orders for dishes that need advance notice.','Set the preparation time so customers know when to expect their food.']},
 jewellery:{n:'Jewellery',ic:'gem',cat:'Collection',one:'piece',add:'Add a piece',pt:'jewellery',stock:true,deliv:true,prep:false,addons:false,pers:true,pre:true,instr:false,vl:'Sizes & finishes',vp:'e.g. Size 7, Gold',verb:'Start packing',done:'Mark delivered',dl:'Delivery & zones',
  f:[['material','Material','text','e.g. 18k gold plated'],['weight','Weight','text','e.g. 12 g'],['stone','Stone or finish','text'],['care','Care instructions','text']],
  tips:['Enable personalisation so customers can request engraving or a name.','Photograph each piece from several angles and add a short video.','Track stock per size or finish using variants.']},
 fashion:{n:'Fashion',ic:'shirt',cat:'Catalogue',one:'item',add:'Add an item',pt:'fashion',stock:true,deliv:true,prep:false,addons:false,pers:true,pre:true,instr:false,vl:'Sizes & colours',vp:'e.g. M / Black',verb:'Start packing',done:'Mark delivered',dl:'Delivery & zones',
  f:[['material','Fabric','text'],['fit','Fit','sel','Regular,Slim,Oversized'],['colours','Colours','text'],['care','Care','text']],
  tips:['Create a variant for every size and colour combination with its own stock.','Show the item on a model or flat lay, plus one detail shot.','Use pre-orders for made-to-measure pieces.']},
 beauty:{n:'Beauty',ic:'sparkle',cat:'Catalogue',one:'product',add:'Add a product',pt:'general',stock:true,deliv:true,prep:false,addons:false,pers:false,pre:false,instr:false,vl:'Sizes & shades',vp:'e.g. 50 ml',verb:'Start packing',done:'Mark delivered',dl:'Delivery & zones',
  f:[['brand','Brand','text'],['skin','Skin or hair type','text'],['size','Size or volume','text'],['ingredients','Key ingredients','text']],
  tips:['List key ingredients and skin type to reduce questions.','Offer shades or sizes as variants.']},
 electronics:{n:'Electronics',ic:'laptop',cat:'Catalogue',one:'product',add:'Add a product',pt:'general',stock:true,deliv:true,prep:false,addons:false,pers:false,pre:false,instr:false,vl:'Models & capacities',vp:'e.g. 128 GB',verb:'Start packing',done:'Mark delivered',dl:'Delivery & zones',
  f:[['brand','Brand','text'],['model','Model','text'],['warranty','Warranty','text','e.g. 12 months'],['specs','Key specifications','textarea']],
  tips:['State the warranty clearly. It builds trust.','Add a short video demonstrating the product.']},
 grocery:{n:'Groceries',ic:'basket',cat:'Catalogue',one:'product',add:'Add a product',pt:'general',stock:true,deliv:true,prep:false,addons:false,pers:false,pre:false,instr:true,vl:'Pack sizes',vp:'e.g. 5 kg',verb:'Start packing',done:'Mark delivered',dl:'Delivery & zones',
  f:[['unit','Unit','text','e.g. per kg, per pack'],['origin','Origin','text'],['expiry','Shelf life','text']],
  tips:['Sell by pack size using variants, for example 1 kg and 5 kg.','Keep stock counts accurate to avoid out-of-stock orders.']},
 service:{n:'Services',ic:'briefcase',cat:'Services',one:'service',add:'Add a service',pt:'general',stock:false,deliv:false,prep:false,addons:true,pers:false,pre:true,instr:true,vl:'Packages',vp:'e.g. Standard (60 min)',verb:'Start service',done:'Mark completed',dl:'Location & coverage',
  f:[['duration','Duration','text','e.g. 60 minutes'],['where','Where it is done','sel','At my location,At your location,Online'],['includes','What is included','textarea']],
  tips:['Describe exactly what is included so customers know what to expect.','Use packages for different durations or levels of service.','Customers can schedule a preferred time when they check out.']},
 general:{n:'General store',ic:'store',cat:'Catalogue',one:'product',add:'Add a product',pt:'general',stock:true,deliv:true,prep:false,addons:false,pers:false,pre:false,instr:false,vl:'Options',vp:'e.g. Large',verb:'Start packing',done:'Mark delivered',dl:'Delivery & zones',
  f:[['brand','Brand','text'],['details','Details','textarea']],tips:['Add clear pictures and descriptions to every item.']}};
const bizOf=c=>({'Food & Drinks':'food','Jewellery':'jewellery','Fashion':'fashion','Beauty':'beauty','Electronics':'electronics','Groceries':'grocery','Services':'service'}[c]||'general');
const BZ=c=>BIZ[bizOf(c)];

/* ---------- dashboard shell: sidebar on tablet/desktop, scrolling tabs on phones ---------- */
function dash({title,sub='',badge:bd='',tabs,active,base,body}){const href=t=>`href="#/${base}?t=${t[0]}"`;
 return `<div class="dash"><aside class="side" aria-label="Sections">${tabs.map(t=>`<a class="sl ${t[0]===active?'on':''}" ${href(t)}>${ic(t[2])}<span>${esc(t[1])}</span></a>`).join('')}</aside><div class="dmain"><div class="dhead"><div><h2>${esc(title)}</h2>${sub?`<div class="mut">${sub}</div>`:''}</div>${bd}</div><nav class="dtabs" aria-label="Sections">${tabs.map(t=>`<a class="${t[0]===active?'on':''}" ${href(t)}>${ic(t[2])}${esc(t[1])}</a>`).join('')}</nav>${body}</div></div>`}
const centerTab=()=>{const a=document.querySelector('.dtabs a.on');if(a&&a.scrollIntoView)a.scrollIntoView({inline:'center',block:'nearest'})};
const optText=o=>{o=o||{};const p=[];if(o.addons?.length)p.push('Add-ons: '+o.addons.join(', '));if(o.spice)p.push('Spice: '+o.spice);if(o.personalisation)p.push('Personalisation: '+o.personalisation);if(o.instructions)p.push('Note: '+o.instructions);return p.length?`<div class="mut sm-t">${esc(p.join(' · '))}</div>`:''};
const fmtDate=d=>d?new Date(d).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'}):'';
