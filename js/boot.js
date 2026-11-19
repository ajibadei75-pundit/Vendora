/* router and boot */
const R=[[/^\/?$/,home],[/^\/s\/([^/]+)\/p\/([^/]+)/,productPage],[/^\/s\/([^/]+)/,storefront],[/^\/checkout\/([^/]+)/,checkout],[/^\/pay\/([^/]+)/,pay],[/^\/track/,track],[/^\/play/,play],[/^\/notifications/,notifications],[/^\/login/,login],[/^\/signup/,signup],[/^\/join/,join],[/^\/vendor/,vendorDash],[/^\/admin/,adminDash],[/^\/account/,account]];
async function route(){clearInterval(S.timer);clearInterval(S.gameIv);clearMaps();$('#welcome')?.remove();document.body.style.overflow='';const h=location.hash.slice(1)||'/';const[p,qs]=h.split('?');const q=new URLSearchParams(qs||'');window.scrollTo(0,0);markNav();
 for(const[re,fn]of R){const m=p.match(re);if(m){app.innerHTML=sk;try{await fn(m,q)}catch(e){app.innerHTML=`<div class="card"><h3>Something went wrong</h3><p class="mut">${esc(e.message)}</p></div>`}return}}
 app.innerHTML='<div class="card empty">Page not found</div>'}
addEventListener('hashchange',route);

loadSession().then(route);
if(location.hash.includes('type=recovery')||location.hash.includes('access_token')){location.hash='#/account'}
