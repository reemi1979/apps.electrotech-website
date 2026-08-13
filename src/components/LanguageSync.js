// src/components/LanguageSync.js

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageSync = ({ onReady }) => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const pathLanguage = pathname.split('/')[1];
    const targetLang = pathLanguage === 'fr' ? 'fr' : 'en';

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang).then(() => {
        setReady(true);
        onReady?.();
      });
    } else {
      setReady(true);
      onReady?.();
    }
  }, [pathname, i18n, onReady]);

  if (!ready) return null;
  return null;
};

export default LanguageSync;
