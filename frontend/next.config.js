/** next.config.js */
const path = require('path');

module.exports = {
  // Make sure outputFileTracingRoot points to your app root
  outputFileTracingRoot: path.join(__dirname),
  
  // i18n configuration
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};