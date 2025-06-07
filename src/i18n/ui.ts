import es from './es.json';
import en from './en.json';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'es';

export const ui = {
  es,
  en,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
