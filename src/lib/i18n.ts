import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
        login: 'Login',
      },
    },
    uz: {
      translation: {
        welcome: 'Xush kelibsiz',
        login: 'Kirish',
      },
    },
    ru: {
      translation: {
        welcome: 'Добро пожаловать',
        login: 'Войти',
      },
    },
  },
  lng: localStorage.getItem('i18nextLng') || navigator.language.split('-')[0] || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
