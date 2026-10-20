import type { Lang } from '../config/site';

/** Чисті URL: UA — /cases/..., EN — /en/cases/... Кожна мова має власні сторінки. */
export const base = (lang: Lang) => (lang === 'en' ? '/en' : '');
export const catalogPath = (lang: Lang) => `${base(lang)}/cases/`;
export const casePath = (lang: Lang, slug: string) => `${base(lang)}/cases/${slug}/`;
export const other = (lang: Lang): Lang => (lang === 'en' ? 'uk' : 'en');

/** Куди веде кнопка «На головну» на сторінці 404. Поки головної немає — каталог кейсів; коли зʼявиться головна, змінити тут. */
export const homePath = (lang: Lang) => catalogPath(lang);
