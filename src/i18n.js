// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import homeFR from './translations/home_fr.json';
import homeEN from './translations/home_en.json';
import policyFR from './translations/policy_fr.json';
import policyEN from './translations/policy_en.json';
import qualityFR from './translations/quality_fr.json';
import qualityEN from './translations/quality_en.json';
import productsFR from './translations/products_fr.json';
import productsEN from './translations/products_en.json';
import achievementsFR from './translations/achievements_fr.json';
import achievementsEN from './translations/achievements_en.json';
import aboutFR from './translations/about_fr.json';
import aboutEN from './translations/about_en.json';
import seoFR from './translations/seo_fr.json';
import seoEN from './translations/seo_en.json';


const resources = {
  fr: {
    home: homeFR,
    policy: policyFR,
    quality: qualityFR,
    products: productsFR,
    achievements: achievementsFR,
    about: aboutFR,
    seo: seoFR,
  },
  en: {
    home: homeEN,
    policy: policyEN,
    quality: qualityEN,
    products: productsEN,
    achievements: achievementsEN,
    about: aboutEN,
    seo: seoEN,
  },
};

i18n
  // ❌ .use(HttpApi) retiré
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
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
