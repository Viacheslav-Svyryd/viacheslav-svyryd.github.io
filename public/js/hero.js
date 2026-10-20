(function(){const V="thick",CURVE="1"==="1",GX=1200;if("2"==="2")document.getElementById("hero").classList.add("gv2");let s=11,pts=[],N=150;const NAR=matchMedia("(max-width:900px)");
let AI=22,STG;
function mono(P,t){const n=P.length,dx=[],m=[],sl=[];for(let i=0;i<n-1;i++){dx.push(P[i+1][0]-P[i][0]);sl.push((P[i+1][1]-P[i][1])/dx[i])}m[0]=sl[0];m[n-1]=sl[n-2];for(let i=1;i<n-1;i++)m[i]=sl[i-1]*sl[i]<=0?0:(sl[i-1]+sl[i])/2;for(let i=0;i<n-1;i++){if(sl[i]===0){m[i]=m[i+1]=0}else{const a=m[i]/sl[i],b=m[i+1]/sl[i],h=Math.hypot(a,b);if(h>3){m[i]=3*a/h*sl[i];m[i+1]=3*b/h*sl[i]}}}let i=0;while(i<n-2&&t>P[i+1][0])i++;const h=dx[i],u=(t-P[i][0])/h,u2=u*u,u3=u2*u;return(2*u3-3*u2+1)*P[i][1]+(u3-2*u2+u)*h*m[i]+(-2*u3+3*u2)*P[i+1][1]+(u3-u2)*h*m[i+1]}
function gen(){s=11;pts=[];
 /* Форма графіка за етапами: [частка ширини, y у viewBox]. Аудит (0–.15) плаский, впровадження (.15–.78) помірний ріст, результат (.78–1) різкий стрибок. */
 STG=N<100?[[0,470],[.15,466],[.46,428],[.78,335],[.9,215],[1,48]]:[[0,462],[.15,458],[.46,411.5],[.78,321],[.9,230],[1,118]];
 for(let i=0;i<N;i++){s=(s*9301+49297)%233280;const r=s/233280;const t=i/(N-1);const K=N<100?1.5:1,wk=Math.sin(i*2*Math.PI/(N<100?5:7))*10*K;
  const y=mono(STG,t)-wk-(r-.5)*(t<.15?24:34)*K;pts.push([t*GX,Math.max(20,Math.min(490,y))])}
 AI=Math.round(.15*(N-1))}
const QS=new URLSearchParams(location.search);N=NAR.matches?72:150;gen();
function setPaths(){const d="M"+pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" L");document.getElementById("ln").setAttribute("d",d);document.getElementById("sh").setAttribute("d",d);document.getElementById("ar").setAttribute("d",d+" L"+GX+" 500 L0 500Z")}
setPaths();
const svg=document.querySelector("#hero .wave"),hero=document.getElementById("hero"),ov=document.getElementById("ov"),NS="http://www.w3.org/2000/svg";
function px(p){const r=svg.getBoundingClientRect(),h=hero.getBoundingClientRect();return[r.left-h.left+r.width*p[0]/1200,r.top-h.top+r.height*p[1]/500]}
function head(x,y,ang,cls,L){const g=document.createElementNS(NS,"g");g.setAttribute("class",cls);g.setAttribute("transform","translate("+x+" "+y+") rotate("+ang+")");const p=document.createElementNS(NS,"path");p.setAttribute("class","tr");p.setAttribute("d","M"+(-L)+" "+(-L*.62)+" L0 0 L"+(-L)+" "+(L*.62));g.appendChild(p);return g}
let arrowGeom=null,arrow=null,prog=0,timer=0,raf=0;const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
function curveC(){const W=hero.clientWidth,want=NAR.matches?Math.max(30,W*.05):Math.max(34,Math.min(64,W*.045)),t0=AI/(N-1),G=[];for(let i=0;i<=80;i++){const t=t0+(1-t0)*i/80;G.push(px([t*GX,mono(STG,t)]))}
 const a=G[0],e=G[G.length-1],P0=[a[0],a[1]-want*.95],P2=[e[0]-("2"==="1"?Math.max(14,W*.014):0),e[1]-want*.8];let cy=P0[1]+(P2[1]-P0[1])*.04;const cx=P0[0]+(P2[0]-P0[0])*.74;
 const mk=()=>{const C=[];for(let i=0;i<=70;i++){const u=i/70,v=1-u;C.push([v*v*P0[0]+2*u*v*cx+u*u*P2[0],v*v*P0[1]+2*u*v*cy+u*u*P2[1]])}return C};
 const gy=x=>{let k=1;while(k<G.length-1&&G[k][0]<x)k++;const A=G[k-1],B=G[k];return A[1]+(B[1]-A[1])*Math.max(0,Math.min(1,(x-A[0])/(B[0]-A[0]||1)))};
 let C=mk();for(let n=0;n<40;n++){let m=1e9;C.forEach(q=>{G.forEach(r=>{m=Math.min(m,Math.hypot(q[0]-r[0],q[1]-r[1]))})});if(m>=want*.85)break;cy-=3;P2[1]-=2;P2[0]+=0;C=mk()}return C}
function drawCurve(){const{pl,pl2,C,cum,len,w,H,hw}=arrow,Lc=Math.max(.001,len*prog),h=Math.min(H,Lc),hh=hw*h/H,ww=w*Math.min(1,Lc/(H*1.5)),sb=Lc-h;
 function at(s){s=Math.max(0,Math.min(len,s));let i=1;while(i<cum.length-1&&cum[i]<s)i++;const a=C[i-1],b=C[i],d=cum[i]-cum[i-1]||1,u=(s-cum[i-1])/d;return[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,(b[0]-a[0])/d,(b[1]-a[1])/d]}
 const Lp=[],Rp=[],n=Math.max(2,Math.ceil(sb/8));for(let i=0;i<=n;i++){const s=sb*i/n,q=at(s),hf=1+(ww/2-1)*(s/(sb||1));Lp.push([q[0]-q[3]*hf,q[1]+q[2]*hf]);Rp.push([q[0]+q[3]*hf,q[1]-q[2]*hf])}
 const qb=at(sb),tp=at(Lc),wl=[qb[0]-qb[3]*hh,qb[1]+qb[2]*hh],wr=[qb[0]+qb[3]*hh,qb[1]-qb[2]*hh];
 const all=Lp.concat([wl,[tp[0],tp[1]],wr],Rp.reverse()),d="M"+all.map(q=>q[0].toFixed(1)+","+q[1].toFixed(1)).join("L")+"Z";pl.setAttribute("d",d);pl2.setAttribute("d",d)}
function drawArrow(){if(!arrow)return;const{pl,pl2,len,w,H,hw}=arrow;const Lc=Math.max(.001,len*prog);if(prog<=0){pl.setAttribute("d","");pl2.setAttribute("d","");return}if(arrow.C){drawCurve();return}
 const v=hero.dataset.ar||"0",h=Math.min(H,Lc),k=h/H,hh=hw*k;let P=[];
 if(v==="1"){const t=Math.max(2.6,w*.3);P.push([[0,-t/2],[Lc-t,-t/2],[Lc-t,t/2],[0,t/2]]);[1,-1].forEach(sg=>{const A=[Lc-h*1.15,sg*hh*1.15],dx=A[0]-Lc,dy=A[1],m=Math.hypot(dx,dy),nx=-dy/m*t/2,ny=dx/m*t/2;P.push([[Lc+nx,ny],[A[0]+nx,A[1]+ny],[A[0]-nx,A[1]-ny],[Lc-nx,-ny]])})}
 else if(v==="2"){P.push([[Lc-h,-hh],[Lc,0],[Lc-h,hh]]);const n=8,g=w*.95,avail=len-H-g,r=1.3;if(avail>0){let ls=[],S=0;for(let i=0;i<n;i++){ls.push(Math.pow(r,i));S+=ls[i]}const sc=(avail-(n-1)*g)/S;let x=0;if(sc>0)for(let i=0;i<n;i++){const l=ls[i]*sc,e=Math.min(x+l,Lc-h-g*.8),d=w*(.32+.68*i/(n-1));if(e>x)P.push([[x,-d/2],[e,-d/2],[e,d/2],[x,d/2]]);x+=l+g}}}
 else{const ww=w*Math.min(1,Lc/(H*1.5));P.push([[0,-1],[Lc-h,-ww/2],[Lc-h,-hh],[Lc,0],[Lc-h,hh],[Lc-h,ww/2],[0,1]])}
 const d=P.map(a=>"M"+a.map(q=>q[0].toFixed(1)+","+q[1].toFixed(1)).join("L")+"Z").join("");pl.setAttribute("d",d);pl2.setAttribute("d",d)}
function flyArrow(){clearTimeout(timer);cancelAnimationFrame(raf);if(V!=="thick")return;if(still){prog=1;drawArrow();return}prog=0;drawArrow();
 timer=setTimeout(()=>{const t0=performance.now(),D=700;(function f(now){const t=Math.min(1,(now-t0)/D);prog=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;drawArrow();if(t<1)raf=requestAnimationFrame(f)})(t0)},1900)}
function aGeom(){const b=px(pts[AI]),e=px(pts[N-1]),w=Math.max(9,Math.min(18,hero.clientWidth*.0095));if(CURVE){const C=curveC(),a=C[0],z=C[C.length-1];return{x0:a[0],y0:a[1],x1:z[0],y1:z[1],w,C}}return{x0:b[0],y0:b[1]-34,x1:e[0],y1:e[1]-34,w,C:null}}
function arrowTop(g,x){if(g.C){const C=g.C;let i=1;while(i<C.length-1&&C[i][0]<x)i++;const a=C[i-1],b=C[i];return a[1]+(b[1]-a[1])*Math.max(0,Math.min(1,(x-a[0])/(b[0]-a[0]||1)))-g.w/2-3}return g.y0+(g.y1-g.y0)*((x-g.x0)/(g.x1-g.x0||1))-g.w/2-3}
function fitText(){hero.style.paddingTop="";hero.style.minHeight="";svg.style.marginTop="";if(V!=="thick")return;
 if(NAR.matches){let m=parseFloat(getComputedStyle(svg).marginTop)||12;for(let i=0;i<10;i++){const g=aGeom(),hr=hero.getBoundingClientRect();let n=0;hero.querySelectorAll("h1,.lead").forEach(el=>{const rg=document.createRange();rg.selectNodeContents(el);[...rg.getClientRects()].forEach(r=>{const x=Math.min(r.right,g.x1)-hr.left;if(x<g.x0)return;n=Math.max(n,(r.bottom-hr.top)-(arrowTop(g,x)-14))})});if(n<=.5)break;m+=n;svg.style.marginTop=m+"px"}return}const base=parseFloat(getComputedStyle(hero).paddingTop),minPad=96,baseH=hero.offsetHeight;let pad=base,extra=0;
 function need(){const g=aGeom(),hr=hero.getBoundingClientRect();let n=0;hero.querySelectorAll("h1,.lead").forEach(el=>{const rg=document.createRange();rg.selectNodeContents(el);[...rg.getClientRects()].forEach(r=>{const x=Math.min(r.right,g.x1)-hr.left;if(x<g.x0)return;n=Math.max(n,(r.bottom-hr.top)-(arrowTop(g,x)-18))})});return n}
 for(let i=0;i<6;i++){const n=need();if(n<=.5)break;if(pad>minPad){pad=Math.max(minPad,pad-n);hero.style.paddingTop=pad+"px"}else{extra=Math.min(320,extra+n/.55);hero.style.minHeight=(baseH+extra)+"px"}}}
function place(){fitText();ov.innerHTML="";arrowGeom=null;const e=px(pts[N-1]);const L=Math.max(18,Math.min(30,hero.clientWidth*.016));
 if(V==="merge"){const b=px(pts[N-1-12]);const ang=Math.atan2(e[1]-b[1],e[0]-b[0])*180/Math.PI;ov.appendChild(head(e[0],e[1],ang,"mh",L*1.4))}
 else if(V==="thick"){const b=px(pts[AI]);const gap=34;let x0=b[0],y0=b[1]-gap,x1=e[0],y1=e[1]-gap;if(CURVE){const C0=curveC();x0=C0[0][0];y0=C0[0][1];x1=C0[C0.length-1][0];y1=C0[C0.length-1][1]}const len=Math.hypot(x1-x0,y1-y0),ang=Math.atan2(y1-y0,x1-x0)*180/Math.PI;
  const w=Math.max(9,Math.min(18,hero.clientWidth*.0095)),H=w*3.4,hw=w*1.45;
  const g=document.createElementNS(NS,"g");let C=null,cum=null,len2=len;if(CURVE){C=curveC();cum=[0];for(let i=1;i<C.length;i++)cum.push(cum[i-1]+Math.hypot(C[i][0]-C[i-1][0],C[i][1]-C[i-1][1]));len2=cum[cum.length-1]}else g.setAttribute("transform","translate("+x0+" "+y0+") rotate("+ang+")");
  const pl=document.createElementNS(NS,"path");pl.setAttribute("class","tkp");g.appendChild(pl);
  const df=document.createElementNS(NS,"defs");df.innerHTML='<clipPath id="ach"><rect class="arr-r" x="'+(CURVE?x0-260:-260)+'" y="'+(CURVE?-1000:-70)+'" width="260" height="'+(CURVE?3000:140)+'"/></clipPath>';g.appendChild(df);
  const pl2=document.createElementNS(NS,"path");pl2.setAttribute("class","tkp2");pl2.setAttribute("clip-path","url(#ach)");g.appendChild(pl2);g.style.setProperty("--alen",((CURVE?x1-x0:len)+260)+"px");ov.appendChild(g);
  arrow={pl,pl2,len:len2,w,H,hw,C,cum};arrowGeom={x0,y0,x1,y1,w,C};drawArrow();[0,1].forEach(i=>{const c=document.createElementNS(NS,"circle");c.setAttribute("class","ping"+(i?" p2":""));c.setAttribute("cx",x1);c.setAttribute("cy",y1);c.setAttribute("r",6);ov.appendChild(c)})}
 else{const b=px(pts[22]);const gap=26;let x0=b[0],y0=b[1]-gap,x1=e[0],y1=e[1]-gap;const ang=Math.atan2(y1-y0,x1-x0)*180/Math.PI;
  const l=document.createElementNS(NS,"path");l.setAttribute("class","tr trl");l.setAttribute("pathLength","1");l.setAttribute("d","M"+x0+" "+y0+" L"+x1+" "+y1);ov.appendChild(l);ov.appendChild(head(x1,y1,ang,"trh",L*1.15))}}

const sc=document.createElementNS(NS,"svg");sc.setAttribute("class","sc");sc.setAttribute("aria-hidden","true");
sc.innerHTML='<polygon class="scd"/><line class="scl"/><circle class="scr" r="11"/><circle class="scp" r="5"/>';hero.insertBefore(sc,ov);
const scd=sc.querySelector(".scd"),scl=sc.querySelector(".scl"),scr=sc.querySelector(".scr"),scp=sc.querySelector(".scp");
const lab=document.createElement("div");lab.className="sclab";lab.setAttribute("aria-hidden","true");hero.appendChild(lab);const srow=document.createElement("div");srow.className="srow";srow.setAttribute("aria-hidden","true");hero.appendChild(srow);
const lens=document.createElement("div");lens.className="lens";lens.setAttribute("aria-hidden","true");const lin=document.createElement("div");lin.className="lensin";lens.appendChild(lin);const lc=document.createElement("div");lc.className="lensclip";lc.appendChild(lens);hero.appendChild(lc);
let t0=performance.now(),lt=0,lx=0,ly=0,tx=0,ty=0,lraf=0,lon=false,hideT=0;const Z=1.28;
const LR=()=>Math.max(70,Math.min(105,hero.clientWidth*.055));
function curveY(vx){let i=Math.min(N-2,Math.max(0,Math.floor(vx/GX*(N-1))));const a=pts[i],b=pts[i+1];const u=b[0]===a[0]?0:(vx-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*Math.max(0,Math.min(1,u))}
function stageAt(f){let l=SITE.stages[0].label;SITE.stages.forEach(x=>{if(f>=x.from)l=x.label});return l}
function buildLens(){lin.innerHTML="";hero.querySelectorAll("h1,.lead").forEach(el=>{const c=el.cloneNode(true);c.removeAttribute("data-site");c.style.cssText="position:absolute;margin:0;left:"+el.offsetLeft+"px;top:"+el.offsetTop+"px;width:"+el.offsetWidth+"px;max-width:none;z-index:auto";lin.appendChild(c)});lin.style.width=hero.clientWidth+"px";lin.style.height=hero.clientHeight+"px"}
function lensFrame(){lx+=(tx-lx)*.28;ly+=(ty-ly)*.28;const R=LR();lens.style.width=lens.style.height=2*R+"px";lens.style.transform="translate("+(lx-R)+"px,"+(ly-R)+"px)";lin.style.left=-(lx-R)-2+"px";lin.style.top=-(ly-R)-2+"px";lin.style.transformOrigin=lx+"px "+ly+"px";lin.style.transform="scale("+Z+")";
 if(lon&&(Math.abs(tx-lx)>.3||Math.abs(ty-ly)>.3))lraf=requestAnimationFrame(lensFrame);else lraf=0}
function lensOn(x,y){tx=x;ty=y;if(!lon){lon=true;buildLens();lx=x;ly=y;lens.classList.add("on");hero.classList.add("fxon")}if(!lraf)lraf=requestAnimationFrame(lensFrame)}
function lensOff(){lon=false;lens.classList.remove("on")}
function scanOff(){sc.classList.remove("on");lab.classList.remove("on");srow.querySelectorAll(".on").forEach(x=>x.classList.remove("on"));hero.style.cursor=""}
function scanAt(x,y,h){const r=svg.getBoundingClientRect(),ox=r.left-h.left,oy=r.top-h.top,W=h.width,H=h.height;
 let vx=(x-ox)/r.width*1200;vx=Math.max(0,Math.min(GX,vx));const xc=ox+r.width*vx/1200,yc=oy+r.height*curveY(vx)/500;
 const bot=oy+r.height;let top=oy,pg;
 if(arrowGeom){const g=arrowGeom,xx=Math.max(g.x0,Math.min(g.x1,xc)),ya=g.C?arrowTop(g,xx)+g.w/2+3:g.y0+(g.y1-g.y0)*((xx-g.x0)/(g.x1-g.x0||1));top=Math.min(ya,yc-12);
  pg=[[xc,top],[Math.max(xc,g.x0),Math.min(top,g.y0)],[g.x1,g.y1],[W,g.y1],[W,bot],[xc,bot]]}
 else pg=[[xc,top],[W,top],[W,bot],[xc,bot]];
 scd.setAttribute("points",pg.map(q=>q[0].toFixed(1)+","+q[1].toFixed(1)).join(" "));
 scl.setAttribute("x1",xc);scl.setAttribute("x2",xc);scl.setAttribute("y1",top);scl.setAttribute("y2",bot);
 [scr,scp].forEach(c=>{c.setAttribute("cx",xc);c.setAttribute("cy",yc)});
 const f=vx/GX;let si=0;SITE.stages.forEach((x,i)=>{if(f>=x.from)si=i});const st=SITE.stages[si],L=hero.dataset.lab||"1";
 srow.querySelectorAll("span").forEach((x,i)=>x.classList.toggle("on",i===si));
 lab.innerHTML=L==="3"?"<b>"+st.label+"</b><span>"+st.note+"</span>":st.label;const hw=lab.offsetWidth/2+14;lab.style.left=Math.max(hw,Math.min(W-hw,xc))+"px";lab.style.transform="translateX(-50%)";lab.style.top=(bot+14)+"px";
 hero.classList.add("fxon");sc.classList.add("on");if(L!=="2")lab.classList.add("on");hero.style.cursor="crosshair"}
function fxMove(e){if(performance.now()-t0<2700)return;clearTimeout(hideT);const h=hero.getBoundingClientRect(),x=e.clientX-h.left,y=e.clientY-h.top;
 const R=svg.getBoundingClientRect();let inT=false;
 if(e.pointerType!=="touch")hero.querySelectorAll("h1,.lead").forEach(el=>{const rg=document.createRange();rg.selectNodeContents(el);[...rg.getClientRects()].forEach(r=>{if(e.clientX>=r.left-20&&e.clientX<=r.right+20&&e.clientY>=r.top-20&&e.clientY<=r.bottom+20)inT=true})});
 if(inT&&(!arrowGeom||(x<=arrowGeom.x1&&y<lensLim(arrowGeom,x)+LR()))){scanOff();lensOn(x,y)}else{lensOff();if(e.clientY>=R.top)scanAt(x,y,h);else scanOff()}}
function fxOff(){lensOff();scanOff();hero.classList.remove("fxon")}
hero.addEventListener("pointermove",fxMove);hero.addEventListener("pointerdown",fxMove);hero.addEventListener("pointerleave",fxOff);
hero.addEventListener("pointerup",e=>{if(e.pointerType==="touch"){clearTimeout(hideT);hideT=setTimeout(fxOff,1400)}});hero.addEventListener("pointercancel",fxOff);
addEventListener("resize",fxOff);addEventListener("hero-show",()=>{t0=performance.now();fxOff()});
const place0=place;place=function(){place0();const W=hero.clientWidth;if(arrowGeom){const g=arrowGeom,Y0=arrowTop(g,g.x0),Y1=arrowTop(g,g.x1);if(arrow&&arrow.C){const{C,cum,len,w,H,hw}=arrow,sb=len-H,E=[];for(let i=C.length-1;i>=0;i--){const A=C[Math.max(0,i-1)],B=C[Math.min(C.length-1,i+1)];let tx=B[0]-A[0],ty=B[1]-A[1];const m=Math.hypot(tx,ty)||1;tx/=m;ty/=m;const sv=cum[i],half=(sv<sb?1+(w/2-1)*(sv/(sb||1)):hw*Math.max(0,(len-sv)/H))+1.5;E.push([C[i][0]+ty*half,C[i][1]-tx*half])}lc.style.clipPath="polygon(0 0,"+(C[C.length-1][0]+2)+"px 0,"+E.map(q=>q[0].toFixed(1)+"px "+q[1].toFixed(1)+"px").join(",")+",0 "+E[E.length-1][1].toFixed(1)+"px)"}else{const pp=[];for(let k=0;k<=60;k++){const x=g.x1-(g.x1-g.x0)*k/60;pp.push(x.toFixed(1)+"px "+arrowTop(g,x).toFixed(1)+"px")}lc.style.clipPath="polygon(0 0,"+g.x1+"px 0,"+pp.join(",")+",0 "+Y0+"px)"}}else lc.style.clipPath="none";
 srow.innerHTML="";const r=svg.getBoundingClientRect(),h=hero.getBoundingClientRect(),ox=r.left-h.left,gw=r.width*GX/1200;
 SITE.stages.forEach((st,i)=>{const a=st.from,b=(SITE.stages[i+1]||{from:1}).from;const c=document.createElement("span");c.textContent=st.short;srow.appendChild(c);c.style.left=Math.max(ox+gw*(a+b)/2,c.offsetWidth/2+8)+"px"});srow.style.top=(r.bottom-h.top+16)+"px"};
const lensLim=(g,x)=>arrowTop(g,Math.max(g.x0,Math.min(g.x1,x)));
const q0=new URLSearchParams(location.search).get("ar")||"0";hero.dataset.ar=["0","1","2","3"].includes(q0)?q0:"0";

hero.dataset.lab="1";hero.classList.toggle("nar",NAR.matches);NAR.addEventListener("change",()=>{N=NAR.matches?72:150;gen();setPaths();hero.classList.toggle("nar",NAR.matches);fxOff();place();flyArrow()});document.body.dataset.sp="1";place();
let ambT=0;function ambStart(){hero.classList.remove("amb");clearTimeout(ambT);ambT=setTimeout(()=>hero.classList.add("amb"),2800)}
hero.dataset.amb=(new URLSearchParams(location.search).get("amb")||"")==="0"?"0":"A";
place();flyArrow();ambStart();addEventListener("resize",place);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(!hero.hidden)place()});addEventListener("load",()=>{if(!hero.hidden)place()});
{let rq=0;const rz=()=>{cancelAnimationFrame(rq);rq=requestAnimationFrame(()=>{if(!hero.hidden)place()})};const ro=window.ResizeObserver?new ResizeObserver(rz):null;if(ro){const h1=hero.querySelector("h1"),ld=hero.querySelector(".lead");h1&&ro.observe(h1);ld&&ro.observe(ld)}}
addEventListener("hero-show",()=>{place();flyArrow();ambStart()})})();