// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import mainFR from './translations/main_fr.json';
import mainEN from './translations/main_en.json';
import aboutFR from './translations/about_fr.json';
import aboutEN from './translations/about_en.json';


const resources = {
  fr: {
    main: mainFR,
    about: aboutFR,
  },
  en: {
    main: mainEN,
    about: aboutEN,
  },
};

i18n
  // ❌ .use(HttpApi) retiré
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['fr', 'en'],
    defaultNS: 'main',
    detection: {
      order: [],
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
