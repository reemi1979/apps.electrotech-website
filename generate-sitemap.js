const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const sitemap = new SitemapStream({ hostname: 'https://www.electrotech.ca' });

const filePath = path.join(__dirname, 'public', 'sitemap.xml');
const writeStream = createWriteStream(filePath);
sitemap.pipe(writeStream);

const staticRoutes = [
  '/',
  '/quality',
  '/news',
  '/privacy-policy',
  '/products-control-panels',
  '/products-cables',
  '/products-markers',
  '/products-lines',
  '/tracking',
  '/achievements',
  '/our-team',
  '/contact-us',
  '/jobs',
  '/quote',
];

staticRoutes.forEach(route => {
  sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 });
});

sitemap.end();

streamToPromise(sitemap).then(() => {
  console.log('✅ sitemap.xml generated at /public/sitemap.xml');
});
