import type { Lang } from '../config/site';

const NB = ' ';
const WJ = '⁠';
const UA_M = ['січ.', 'лют.', 'бер.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'вер.', 'жовт.', 'лист.', 'груд.'];
const EN_M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** ISO (YYYY-MM або YYYY-MM-DD) → «18 груд. 2023» (UA) / «Dec 18, 2023» (EN, формат США). NBSP всередині. */
export function fmtDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-');
  const mi = Number(m) - 1;
  if (lang === 'uk') return d ? `${Number(d)}${NB}${UA_M[mi]}${NB}${y}` : `${UA_M[mi]}${NB}${y}`;
  return d ? `${EN_M[mi]}${NB}${Number(d)},${NB}${y}` : `${EN_M[mi]}${NB}${y}`;
}

export const timeTag = (iso: string, lang: Lang) => `<time datetime="${iso}">${fmtDate(iso, lang)}</time>`;

/** {{2025-11}} / {{2025-11-10}} → <time>. */
export function dateTokens(s: string, lang: Lang): string {
  return s.replace(/\{\{([\d-]+)\}\}/g, (_, iso) => timeTag(iso, lang));
}

/** Те саме, але для атрибутів (alt/title/aria/meta): без тегів, без NBSP/WJ. */
export function plain(s: string, lang: Lang): string {
  return s
    .replace(/\{\{([\d-]+)\}\}/g, (_, iso) => fmtDate(iso, lang))
    .replace(/<[^>]+>/g, '')
    .replace(/[ ⁠]/g, (c) => (c === NB ? ' ' : ''))
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Слова та діапазони через дефіс/тире/слеш (E-E-A-T, H1–H6, UX/UI, user-friendly) не розриваються.
 * Працює лише з текстом поза тегами. НЕ застосовувати до атрибутів.
 */
const TOKEN = /[\p{L}\p{N}]+(?:[-‑–/][\p{L}\p{N}]+)+/gu;
export function nb(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part, i) => {
      if (i % 2) return part; // тег
      return part.replace(TOKEN, (m) => `<span class="nb">${m}</span>`);
    })
    .join('');
}

/** nb() + дати-токени: для будь-якого короткого тексту (підпис, hook, значення). */
export const rich = (s: string, lang: Lang) => nb(dateTokens(s, lang));

/** Кількість «рядків» sparkline для картки — детермінований SVG як у макеті. */
export function spark(i: number): string {
  let s = i * 7 + 3;
  const p: string[] = [];
  const n = 28;
  for (let k = 0; k < n; k++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const y = 88 - 62 * Math.pow(k / (n - 1), 1.5) - (r - 0.5) * 16;
    p.push(((k / (n - 1)) * 200).toFixed(1) + ',' + Math.max(4, Math.min(96, y)).toFixed(1));
  }
  return `<svg class="spark" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><polyline pathLength="1" points="${p.join(' ')}"/></svg>`;
}

/** Кінцевий результат markdown-тіла: розбиття на секції за маркерами <!--problem--> тощо. */
export function splitSections(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /<!--(\w+)-->/g;
  const marks = [...body.matchAll(re)];
  marks.forEach((m, i) => {
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < marks.length ? marks[i + 1].index : body.length;
    out[m[1]] = body.slice(start, end).trim();
  });
  return out;
}
