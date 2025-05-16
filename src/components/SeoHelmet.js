import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SeoHelmet = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation('seo');

  const canonicalUrl = `https://www.electrotech.ca${pathname.endsWith('/') ? pathname : pathname + '/'}`;
  const lang = i18n.language === 'en' ? 'en_CA' : 'fr_CA';

  const rawPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const currentPath = rawPath.replace(/^\/(en|fr)/, '') || '/';

  const title = t(`pages.${currentPath}.title`, t('defaultTitle'));
  const description = t(`pages.${currentPath}.description`, t('defaultDescription'));


  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>

      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang} />
      <meta property="fb:app_id" content="4066793063644485" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Électrotech Automatisation Industrielle",
          "url": "https://www.electrotech.ca",
          "logo": "https://www.electrotech.ca/photos/og-thumbnail.jpg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-450-776-2628",
            "contactType": "Customer Service",
            "areaServed": "CA",
            "availableLanguage": ["French", "English"]
          },
          "sameAs": [
            "https://www.facebook.com/ElectrotechAutomatisationIndustrielle",
            "https://ca.linkedin.com/company/electrotech-ca"
          ]
        }
        `}
      </script>

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.electrotech.ca",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.electrotech.ca/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        `}
      </script>
    </Helmet>
  );
};

export default SeoHelmet;
