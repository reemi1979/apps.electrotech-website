// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import homeFR from './translations/home_fr.json';
import homeEN from './translations/home_en.json';
import policyFR from './translations/policy_fr.json';
import policyEN from './translations/policy_en.json';
import qualityFR from './translations/quality_fr.json';
import qualityEN from './translations/quality_en.json';

const resources = {
  fr: {
    home: homeFR,
    policy: policyFR,
    quality: qualityFR,
  },
  en: {
    home: homeEN,
    policy: policyEN,
    quality: qualityEN,
  }
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    resources,
    fallbackLng: 'fr', // 👈 important si langue non supportée
    supportedLngs: ['fr', 'en'], // 👈 limite aux langues qu’on gère
    defaultNS: 'home',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
