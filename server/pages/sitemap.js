/*
 * sitemap.xml
 */

'use strict';

module.exports = (request) => {
  let xml =
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${request.protocol}://${request.headers.host}</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url><loc>${request.protocol}://${request.headers.host}/about</loc></url>
    </urlset>`;
  return xml;
};