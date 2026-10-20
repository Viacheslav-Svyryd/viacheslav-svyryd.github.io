/**
 * ЄДИНЕ місце для імені та загальних текстів сайту.
 * Ім'я нижче — тимчасова заглушка (UA: «Свирид В’ячеслав», EN: «Viacheslav Svyryd»).
 * У футері для обох мов використовується латинське написання (owner).
 */
export type Lang = 'uk' | 'en';

export const OWNER_LATIN = 'Viacheslav Svyryd';
export const TELEGRAM = 'https://t.me/slav_viache';
export const NOINDEX = true; // false — коли сайт відкриють для індексації (див. README)

export const SITE = {
  uk: {
    htmlLang: 'uk',
    brand: 'Свирид В’ячеслав',
    role: 'SEO-спеціаліст',
    metaTitle: 'Кейси SEO-просування сайтів | Свирид В’ячеслав',
    metaDescription:
      'Ознайомтеся з моїми кейсами SEO-просування сайтів у різних нішах і ГЕО (UA, US, CA, UK) ✍ Опис проблем, методів їх вирішення та результатів з конкретними цифрами 📈 Дані GSC, GA4, Ahrefs тощо.',
    heroTitle: 'Кейси SEO-просування',
    heroLead: 'Детальний опис роботи над кожним проєктом: точки зростання, проблеми та їх вирішення, кінцевий результат.',
    stages: [
      { from: 0, label: 'Аудит і пошук точок зростання', short: 'Аудит', note: 'Розбираю сайт і шукаю, що гальмує зростання' },
      { from: 0.15, label: 'Впровадження рішень', short: 'Впровадження рішень', note: 'Виправляю помилки, оптимізую сторінки, пишу тексти' },
      { from: 0.78, label: 'Результат', short: 'Результат', note: 'Зростання трафіку та позицій у пошуку' },
    ],
    geoTag: { UA: 'UA кейс', EN: 'ENG кейс' },
    filters: [
      { id: 'all', label: 'Всі кейси' },
      { id: 'UA', label: 'UA кейси' },
      { id: 'EN', label: 'ENG кейси' },
    ],
    rights: 'Усі права захищені.',
  },
  en: {
    htmlLang: 'en',
    brand: 'Viacheslav Svyryd',
    role: 'SEO Specialist',
    metaTitle: 'SEO Case Studies | Viacheslav Svyryd',
    metaDescription:
      'Explore my SEO case studies across niches and markets (UA, US, CA, UK) ✍ Problems, solutions, and results with specific numbers 📈 Data from GSC, GA4, Ahrefs, and more.',
    heroTitle: 'SEO Case Studies',
    heroLead: 'Each project in detail: growth opportunities, problems, solutions, and the final result.',
    stages: [
      { from: 0, label: 'Audit and growth opportunities', short: 'Audit', note: 'Digging into the site to find what’s holding growth back' },
      { from: 0.15, label: 'Implementation of solutions', short: 'Implementation', note: 'Fixing errors, optimizing pages, writing copy' },
      { from: 0.78, label: 'Results', short: 'Results', note: 'Growth in traffic and search rankings' },
    ],
    geoTag: { UA: 'Ukraine', EN: 'International' },
    filters: [
      { id: 'all', label: 'All cases' },
      { id: 'UA', label: 'Ukraine' },
      { id: 'EN', label: 'International' },
    ],
    rights: 'All rights reserved.',
  },
} as const;

/** Тексти інтерфейсу сторінки кейсу / каталогу. */
export const UI = {
  uk: {
    back: '← Усі кейси', all: 'Усі кейси', zoom: 'Збільшити зображення: ',
    metric: 'Показник', secs: 'Розділи кейсу', filt: 'Фільтр за ГЕО', cases: 'Кейси', langAria: 'Мова',
    tg: 'Написати в Telegram', home: 'Головна',
    nav: [['about', 'Про проєкт'], ['result', 'Ключовий результат'], ['dyn', 'Динаміка результатів'], ['detail', 'Детальний опис']],
    about: 'Про проєкт', key: 'Ключовий результат', dyn: 'Динаміка результатів', detail: 'Детальний опис',
    prob: 'Проблема', sol: 'Рішення', res: 'Результат', lim: 'Фактори, що обмежували темпи зростання',
    agency: '* — Кейс також опубліковано на сайті агентства.',
    shot: (src: string, title: string) => `Скріншот ${src}: ${title}`,
    nf: {
      title: 'Сторінку не знайдено',
      text: 'Можливо, посилання застаріло або в адресі є помилка.',
      cta: 'На головну',
      metaDescription: 'Такої сторінки не існує. Поверніться на головну сторінку сайту.',
    },
    present: 'дотепер', asOf: 'станом на',
  },
  en: {
    back: '← All cases', all: 'All cases', zoom: 'Enlarge image: ',
    metric: 'Metric', secs: 'Case study sections', filt: 'Filter by market', cases: 'Case studies', langAria: 'Language',
    tg: 'Message me on Telegram', home: 'Home',
    nav: [['about', 'About the project'], ['result', 'Key result'], ['dyn', 'Results over time'], ['detail', 'Detailed breakdown']],
    about: 'About the project', key: 'Key result', dyn: 'Results over time', detail: 'Detailed breakdown',
    prob: 'Problem', sol: 'Solution', res: 'Result', lim: 'Factors that limited the pace of growth',
    agency: '* — This case study is also published on the agency’s website.',
    shot: (src: string, title: string) => `${src} screenshot: ${title}`,
    nf: {
      title: 'Page not found',
      text: 'The link may be outdated or there is a typo in the address.',
      cta: 'Back to home',
      metaDescription: 'This page does not exist. Go back to the home page of the site.',
    },
    present: 'present', asOf: 'as of',
  },
} as const;
