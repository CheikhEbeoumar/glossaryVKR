import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const translations = {
  en,
  ru,
};

export function useTranslation() {
  const router = useRouter();
  const { locale } = router;

  const t = (key) => {
    const keys = key.split('.');
    let translation = translations[locale] || translations.en;
    
    for (const k of keys) {
      translation = translation[k];
      if (!translation) {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key;
      }
    }
    
    return translation;
  };

  const changeLanguage = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return {
    t,
    locale,
    changeLanguage,
    locales: router.locales,
  };
}