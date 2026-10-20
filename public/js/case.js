/* Скрипти сторінки кейсу: лайтбокс, навігація по розділах, прогрес-лінія, лічильники. Мова береться з <html lang>. */
const LANG=document.documentElement.lang==="en"?"en":"uk";
const UI={uk:{lbView:"Перегляд зображення",lbOut:"Зменшити",lbIn:"Збільшити",lbX:"Закрити",dec:",",grp:" "},en:{lbView:"Image viewer",lbOut:"Zoom out",lbIn:"Zoom in",lbX:"Close",dec:".",grp:","}};
const U=()=>UI[LANG];
let LB=null;
function openLB(img,from){
 const nw=img.naturalWidth||1200,nh=img.naturalHeight||700,L=[1,1.5,2,3,4];let k=0;
 if(!LB){LB=document.createElement("div");LB.className="lb";LB.setAttribute("role","dialog");LB.setAttribute("aria-modal","true");LB.setAttribute("aria-label",U().lbView);
  LB.innerHTML='<div class="lbbar"><button type="button" data-z="out" aria-label="'+U().lbOut+'"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button><span class="lbz" aria-live="polite">100%</span><button type="button" data-z="in" aria-label="'+U().lbIn+'"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg></button><button type="button" data-z="x" class="lbx" aria-label="'+U().lbX+'"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><div class="lbst"><img alt=""></div>';document.body.appendChild(LB)}
 const st=LB.querySelector(".lbst"),im=LB.querySelector("img"),zt=LB.querySelector(".lbz");im.src=img.getAttribute("data-full")||img.src;im.alt=img.alt;
 const fit=()=>Math.min(innerWidth*.94,(innerHeight-96)*(nw/nh));
 function apply(nk){const cx=(st.scrollLeft+st.clientWidth/2)/(im.offsetWidth||1),cy=(st.scrollTop+st.clientHeight/2)/(im.offsetHeight||1);k=Math.max(0,Math.min(L.length-1,nk));im.style.width=fit()*L[k]+"px";st.scrollLeft=cx*im.offsetWidth-st.clientWidth/2;st.scrollTop=cy*im.offsetHeight-st.clientHeight/2;zt.textContent=Math.round(L[k]*100)+"%";st.classList.toggle("zm",k>0)}
 function close(){LB.classList.remove("on");document.documentElement.style.overflow="";removeEventListener("keydown",key);removeEventListener("resize",rs);setTimeout(()=>{if(!LB.classList.contains("on"))LB.style.display="none"},220);from&&from.focus&&from.focus()}
 const key=e=>{if(e.key==="Escape")close();else if(e.key==="+"||e.key==="=")apply(k+1);else if(e.key==="-")apply(k-1);else if(e.key==="0")apply(0);else if(e.key==="Tab"){const b=[...LB.querySelectorAll("button")],i=b.indexOf(document.activeElement);e.preventDefault();b[(i+(e.shiftKey?-1:1)+b.length)%b.length].focus()}};
 const rs=()=>apply(k);
 let mv=false,bg=false;LB.onclick=e=>{if(mv){mv=false;return}const b=e.target.closest("button[data-z]");if(b){const z=b.dataset.z;z==="in"?apply(k+1):z==="out"?apply(k-1):close();return}if(e.target===st&&bg)close()};
 im.ondblclick=()=>apply(k?0:2);
 let dr=false,sx=0,sy=0,sl=0,stp=0;st.onpointerdown=e=>{mv=false;bg=e.target===st;if(e.pointerType==="touch"||!k||e.target!==im)return;dr=true;sx=e.clientX;sy=e.clientY;sl=st.scrollLeft;stp=st.scrollTop;st.setPointerCapture(e.pointerId);st.classList.add("gr")};
 st.onpointermove=e=>{if(dr){if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>4)mv=true;st.scrollLeft=sl-(e.clientX-sx);st.scrollTop=stp-(e.clientY-sy)}};st.onpointerup=st.onpointercancel=()=>{dr=false;st.classList.remove("gr")};
 LB.style.display="";document.documentElement.style.overflow="hidden";apply(0);addEventListener("keydown",key);addEventListener("resize",rs);requestAnimationFrame(()=>{LB.classList.add("on");LB.querySelector('[data-z="in"]').focus()})}
function caseFx(){
 const art=document.querySelector(".case");if(!art)return;
 const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
 const secs=[...art.querySelectorAll(".cbody>section")],links=[...art.querySelectorAll(".cnav a")],nav=art.querySelector(".cnav");
 if(nav){const chk=()=>{nav.classList.toggle("ml",nav.scrollLeft>4);nav.classList.toggle("mr",nav.scrollLeft+nav.clientWidth<nav.scrollWidth-4)};nav.addEventListener("scroll",chk,{passive:true});addEventListener("resize",chk);setTimeout(chk,0);
  nav.addEventListener("wheel",e=>{if(nav.scrollWidth>nav.clientWidth&&Math.abs(e.deltaY)>Math.abs(e.deltaX)){nav.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});
  let sx=0,sl=0,dr=false,mv=false;nav.addEventListener("pointerdown",e=>{if(e.pointerType==="touch"||e.button)return;dr=true;mv=false;sx=e.clientX;sl=nav.scrollLeft});
  addEventListener("pointermove",e=>{if(!dr)return;const d=e.clientX-sx;if(Math.abs(d)>4)mv=true;if(mv)nav.scrollLeft=sl-d});addEventListener("pointerup",()=>{dr=false});
  nav.addEventListener("click",e=>{if(mv){e.preventDefault();e.stopImmediatePropagation();mv=false}},true);nav.addEventListener("dragstart",e=>e.preventDefault())}
 art.querySelectorAll(".frame").forEach(f=>{const go=()=>openLB(f.querySelector("img"),f);f.addEventListener("click",go);f.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
 links.forEach(a=>a.onclick=e=>{e.preventDefault();const t=document.getElementById(a.dataset.s);if(t)t.scrollIntoView({behavior:still?"auto":"smooth",block:"start"})});
 const steps=art.querySelector(".steps"),fill=art.querySelector(".steps .fill"),sts=[...art.querySelectorAll(".st")];let tick=0,last="";
 function upd(){tick=0;if(!document.body.contains(art)){removeEventListener("scroll",req);removeEventListener("resize",req);return}
  const vh=innerHeight;let cur=secs[0];secs.forEach(x=>{if(x.getBoundingClientRect().top<vh*.4)cur=x});
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=secs[secs.length-1];
  if(cur.id!==last){last=cur.id;links.forEach(a=>{const on=a.dataset.s===cur.id;a.classList.toggle("on",on);if(on&&nav.scrollWidth>nav.clientWidth)nav.scrollTo({left:a.offsetLeft-24,behavior:"smooth"})})}
  if(steps){const r=steps.getBoundingClientRect(),y=vh*.62,atEnd=innerHeight+scrollY>=document.documentElement.scrollHeight-4,tl=sts[sts.length-1].offsetTop+8;steps.style.setProperty("--tl",tl+"px");const k=atEnd?1:Math.max(0,Math.min(1,(y-r.top-8)/(tl-8)));fill.style.height=(k*(tl-8))+"px";sts.forEach(x=>x.classList.toggle("on",atEnd||x.getBoundingClientRect().top<y))}}
 function req(){if(!tick)tick=requestAnimationFrame(upd)}
 addEventListener("scroll",req,{passive:true});addEventListener("resize",req);upd();
 if(still)return;art.classList.add("fx");
 const pm=t=>LANG==="en"?t.match(/^(\D*?)(\d[\d,]*)(?:\.(\d+))?(.*)$/):t.match(/^(\D*?)(\d[\d\s ]*)(?:,(\d+))?(.*)$/);
 const fmt=(el,v)=>{const m=pm(el.dataset.t);if(!m)return;const d=m[3]?m[3].length:0,grp=LANG==="en"?/,/.test(m[2]):/[\s ]/.test(m[2]);let t=v.toFixed(d);let[i,f]=t.split(".");if(grp)i=i.replace(/\B(?=(\d{3})+(?!\d))/g,U().grp);el.textContent=m[1]+i+(f?U().dec+f:"")+m[4]};
 const val=el=>{const m=pm(el.dataset.t);return m?parseFloat(m[2].replace(/[\s\u00a0,]/g,"")+"."+(m[3]||"0")):null};
 const cnt=[...art.querySelectorAll("[data-count]")];cnt.forEach(el=>{el.dataset.t=el.textContent;el.dataset.s=el.dataset.t;if(val(el)!==null)fmt(el,0)});
 const sz=()=>cnt.forEach(el=>{if(!el.dataset.t||!el.isConnected)return;const sp=document.createElement("span");sp.style.cssText="position:absolute;visibility:hidden;white-space:pre;font:inherit;letter-spacing:inherit";el.appendChild(sp);let bw=0,bd="8";for(let d=0;d<10;d++){sp.textContent=String(d).repeat(4);const w=sp.getBoundingClientRect().width;if(w>bw){bw=w;bd=String(d)}}sp.remove();el.dataset.s=el.dataset.t.replace(/\d/g,bd)});sz();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sz);
 function run(el){const v=val(el);if(v===null)return;const t0=performance.now(),D=1100;(function f(n){const k=Math.min(1,(n-t0)/D);fmt(el,v*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f);else el.textContent=el.dataset.t})(t0)}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const t=e.target;if(t.hasAttribute("data-count"))run(t);else{t.classList.add("go");t.querySelectorAll("[data-count]").forEach((el,i)=>setTimeout(()=>run(el),i*350))}}),{threshold:.4});
 art.querySelectorAll(".kbig b,.frame,.traf").forEach(el=>io.observe(el))}

caseFx();
