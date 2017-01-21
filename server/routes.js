/*
 * Map routes to page rendering functions.
 */

module.exports = {
  '/': require('./pages/home'),
  '/about': require('./pages/about'),
  '/robots.txt': require('./pages/robots'),
  // '/sitemap.xml': require('./pages/sitemap'),
  '/version': require('./pages/version')
};
