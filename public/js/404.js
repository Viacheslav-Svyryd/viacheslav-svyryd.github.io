/* Анімація «404»: струм-комета по єдиному зовнішньому контуру цифр (canvas 2D), запинка на «0», прорив, затухання.
   Контур і дірки — з inline JSON #g404 (src/lib/glyph404.json). Без залежностей. Логіка — як у еталонному варіанті 4. */
(function () {
  var data = document.getElementById('g404'), cv = document.getElementById('nf-cv');
  if (!data || !cv || !cv.getContext) return;
  var G = JSON.parse(data.textContent), OUTER = G.outer, VB = G.viewBox;
  var NS = 'http://www.w3.org/2000/svg', Y = '255,212,0', HOT = '255,246,176', T = 6.4, B1 = 838, B2 = 1676;
  var mod = function (a, m) { return ((a % m) + m) % m; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  var holder = document.createElementNS(NS, 'svg'), probe = document.createElementNS(NS, 'path');
  holder.setAttribute('aria-hidden', 'true'); holder.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden';
  probe.setAttribute('d', OUTER); holder.appendChild(probe); document.body.appendChild(holder);
  var L = probe.getTotalLength(), N = 600, F0 = 0, S0 = 0, bd = 1e9, bs = 1e9, i, p, d;
  for (i = 0; i < N; i++) {
    p = probe.getPointAtLength(L * i / N);
    d = Math.hypot(p.x - 1260, p.y + 767); if (d < bd) { bd = d; F0 = i / N; }   // верх «0»
    d = Math.hypot(p.x - 25, p.y); if (d < bs) { bs = d; S0 = L * i / N; }       // лівий нижній кут першої «4»
  }
  F0 = mod(F0 - S0 / L, 1);
  var P2D = new Path2D(OUTER), HP = G.holes.map(function (h) { return new Path2D(h); });
  var pt = function (s) { return probe.getPointAtLength(mod(s, L)); };
  var c = cv.getContext('2d'), k = 1;

  function setup() {
    var dpr = Math.min(2, window.devicePixelRatio || 1), w = cv.clientWidth || 600, W = Math.round(w * dpr);
    if (cv.width !== W) { cv.width = W; cv.height = Math.round(w * dpr * VB.h / VB.w); }
    k = cv.width / VB.w;
  }
  function base(fill) { // fill — яскравість підсвітки «0», 0..1
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height);
    c.setTransform(k, 0, 0, k, -VB.x * k, -VB.y * k);
    c.save(); c.clip(P2D); c.fillStyle = '#0f0c00'; c.fillRect(VB.x, VB.y, VB.w, VB.h);
    if (fill > .001) { var g = c.createLinearGradient(0, -800, 0, 0); g.addColorStop(0, 'rgba(' + Y + ',' + .22 * fill + ')'); g.addColorStop(1, 'rgba(' + Y + ',' + .08 * fill + ')'); c.fillStyle = g; c.fillRect(B1, VB.y, B2 - B1, VB.h); }
    c.restore();
    c.save(); c.fillStyle = '#000'; HP.forEach(function (h) { c.fill(h); }); c.restore();
    c.lineJoin = 'round'; c.lineCap = 'round';
    c.strokeStyle = 'rgba(' + Y + ',.22)'; c.lineWidth = 16; c.stroke(P2D);
    HP.forEach(function (h) { c.strokeStyle = 'rgba(' + Y + ',.10)'; c.lineWidth = 7; c.stroke(h); });
  }
  function seg(from, len, w, a) { // шматок ободка; двічі (from і from-L) — щоб без шва через початок контуру
    if (a <= .003 || len <= 0) return;
    c.strokeStyle = 'rgba(' + Y + ',' + a + ')'; c.lineWidth = w; c.lineCap = 'butt'; c.setLineDash([len, L * 2]);
    c.lineDashOffset = -from; c.stroke(P2D); c.lineDashOffset = -(from - L); c.stroke(P2D); c.setLineDash([]);
  }
  function trail(head, len, w, K, pow, fade) { // хвіст-комета: K шматків від голови назад
    var sl = len / K, i, t, a, ww;
    for (i = K - 1; i >= 0; i--) {
      t = i / K; a = Math.pow(1 - t, pow) * fade; ww = w * (.35 + .65 * (1 - t));
      seg(head - (i + 1) * sl - .6, sl + 1.2, ww * 3.4, a * .13); seg(head - (i + 1) * sl - .6, sl + 1.2, ww, a);
    }
  }
  function spark(s, r, a) {
    var q = pt(s), g = c.createRadialGradient(q.x, q.y, 0, q.x, q.y, r);
    g.addColorStop(0, 'rgba(' + HOT + ',' + a + ')'); g.addColorStop(.25, 'rgba(' + Y + ',' + a * .55 + ')'); g.addColorStop(1, 'rgba(' + Y + ',0)');
    c.fillStyle = g; c.beginPath(); c.arc(q.x, q.y, r, 0, 7); c.fill();
    c.fillStyle = 'rgba(255,255,235,' + Math.min(1, a) + ')'; c.beginPath(); c.arc(q.x, q.y, 9, 0, 7); c.fill();
  }
  function draw(t, still) {
    var u = still ? .45 : mod(t, T) / T, key = [[0, 0], [.26, F0 * .97], [.30, F0], [.58, F0], [.68, F0 + .3], [.90, 1], [1, 1]], f = 0, j, q;
    for (j = 0; j < key.length - 1; j++) if (u >= key[j][0] && u <= key[j + 1][0]) {
      q = (u - key[j][0]) / (key[j + 1][0] - key[j][0]);
      f = key[j][1] + (key[j + 1][1] - key[j][1]) * (j === 3 || j === 4 ? ease(q) : (j === 0 ? q * q * (3 - 2 * q) : q)); break;
    }
    var head = S0 + L * f, stumble = u > .30 && u < .62;
    var fl = still ? 1 : stumble ? clamp(.35 + .65 * Math.abs(Math.sin(t * 23) * Math.sin(t * 9.3 + 1)), 0, 1) * (.6 + .4 * Math.sin(t * 61)) : 1;
    var al = still ? 1 : fl * (u > .9 ? 1 - (u - .9) / .1 : 1) * Math.min(1, u / .04);
    base(stumble ? .55 * fl : .2 * clamp(1 - (u - .62) * 3, 0, 1));
    trail(head, stumble ? L * .12 : L * (.12 + .18 * clamp((u - .58) / .2, 0, 1)), 30, 60, 1.35, al);
    spark(head, stumble ? 50 + 24 * fl : 68, .9 * al);
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)'), vis = true, raf = 0, last = 0, clock = 0;
  var ok = function () { return vis && !document.hidden && !reduce.matches; };
  function paint() { setup(); draw(clock, reduce.matches); }
  function tick(now) {
    raf = 0; if (!ok()) { last = 0; return; }
    clock += last ? Math.min(.1, (now - last) / 1000) : 0; last = now; paint(); raf = requestAnimationFrame(tick);
  }
  function kick() { if (reduce.matches) { paint(); return; } if (!raf && ok()) { last = 0; raf = requestAnimationFrame(tick); } }
  cv.parentNode.classList.add('on'); paint();
  document.addEventListener('visibilitychange', kick);
  if (reduce.addEventListener) reduce.addEventListener('change', kick);
  if (window.IntersectionObserver) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; kick(); }).observe(cv);
  if (window.ResizeObserver) new ResizeObserver(function () { if (!raf) paint(); }).observe(cv); else window.addEventListener('resize', function () { if (!raf) paint(); });
  kick();
})();
