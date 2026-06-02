<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/1999/xhtml"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - LinktoThrive</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #1a2b5c 0%, #2d4a8a 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
          }
          
          .header p {
            font-size: 1.1em;
            opacity: 0.9;
            margin-bottom: 5px;
          }
          
          .header .url {
            font-size: 0.9em;
            opacity: 0.7;
            font-family: 'Courier New', monospace;
          }
          
          .info-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px;
            border-radius: 8px;
          }
          
          .info-box h2 {
            color: #1a2b5c;
            font-size: 1.3em;
            margin-bottom: 10px;
          }
          
          .info-box p {
            color: #666;
            line-height: 1.8;
          }
          
          .stats {
            display: flex;
            justify-content: space-around;
            padding: 30px 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e0e0e0;
          }
          
          .stat {
            text-align: center;
          }
          
          .stat-number {
            font-size: 2.5em;
            font-weight: 700;
            color: #667eea;
            display: block;
          }
          
          .stat-label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .url-list {
            padding: 20px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          
          thead {
            background: #1a2b5c;
            color: white;
          }
          
          th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          tbody tr {
            border-bottom: 1px solid #e0e0e0;
            transition: background-color 0.2s;
          }
          
          tbody tr:hover {
            background-color: #f8f9fa;
          }
          
          tbody tr:nth-child(even) {
            background-color: #fafafa;
          }
          
          tbody tr:nth-child(even):hover {
            background-color: #f0f0f0;
          }
          
          td {
            padding: 15px;
            font-size: 0.9em;
          }
          
          td.url {
            color: #667eea;
            font-weight: 500;
            word-break: break-all;
          }
          
          td.url a {
            color: #667eea;
            text-decoration: none;
            transition: color 0.2s;
          }
          
          td.url a:hover {
            color: #1a2b5c;
            text-decoration: underline;
          }
          
          td.priority {
            color: #28a745;
            font-weight: 600;
          }
          
          td.changefreq {
            color: #666;
            text-transform: capitalize;
          }
          
          td.lastmod {
            color: #666;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
          }
          
          .footer {
            text-align: center;
            padding: 30px;
            background: #f8f9fa;
            color: #666;
            font-size: 0.9em;
            border-top: 1px solid #e0e0e0;
          }
          
          .footer a {
            color: #667eea;
            text-decoration: none;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 600;
            background: #e7f3ff;
            color: #0066cc;
          }
          
          @media (max-width: 768px) {
            .header h1 {
              font-size: 1.8em;
            }
            
            .stats {
              flex-direction: column;
              gap: 20px;
            }
            
            table {
              font-size: 0.8em;
            }
            
            th, td {
              padding: 10px 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗺️ XML Sitemap</h1>
            <p>LinktoThrive - Chino Valley Marketing Agency</p>
            <p class="url">https://linktothrive.com</p>
          </div>
          
          <div class="stats">
            <div class="stat">
              <span class="stat-number">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
              </span>
              <span class="stat-label">Total URLs</span>
            </div>
            <div class="stat">
              <span class="stat-number">
                <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/>
              </span>
              <span class="stat-label">Sitemaps</span>
            </div>
          </div>
          
          <div class="info-box">
            <h2>📋 About This Sitemap</h2>
            <p>
              This XML Sitemap is used by search engines like Google, Bing, and Yahoo to discover and index pages on this website.
              It contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs with metadata about each page including
              last modification date, change frequency, and priority.
            </p>
          </div>
          
          <div class="url-list">
            <xsl:choose>
              <xsl:when test="sitemap:urlset/sitemap:url">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 50%">URL</th>
                      <th style="width: 20%">Last Modified</th>
                      <th style="width: 15%">Change Freq</th>
                      <th style="width: 15%">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                      <tr>
                        <td class="url">
                          <a href="{sitemap:loc}">
                            <xsl:value-of select="sitemap:loc"/>
                          </a>
                        </td>
                        <td class="lastmod">
                          <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                        </td>
                        <td class="changefreq">
                          <xsl:value-of select="sitemap:changefreq"/>
                        </td>
                        <td class="priority">
                          <xsl:value-of select="sitemap:priority"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>
              <xsl:otherwise>
                <table>
                  <thead>
                    <tr>
                      <th style="width: 70%">Sitemap</th>
                      <th style="width: 30%">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <tr>
                        <td class="url">
                          <a href="{sitemap:loc}">
                            <xsl:value-of select="sitemap:loc"/>
                          </a>
                        </td>
                        <td class="lastmod">
                          <xsl:value-of select="sitemap:lastmod"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          
          <div class="footer">
            <p>
              Generated by <a href="https://astro.build" target="_blank">Astro</a> • 
              Learn more about <a href="https://www.sitemaps.org/" target="_blank">XML Sitemaps</a>
            </p>
            <p style="margin-top: 10px;">
              © 2025 LinktoThrive. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
