/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.wisfile.ai',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: 'public',
  exclude: ['/api/*', '/faq/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.wisfile.ai/sitemap-0.xml',
      'https://www.wisfile.ai/sitemap-1.xml',
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    
    // Feature pages get high priority
    if (path.startsWith('/features/')) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // Downloads page gets high priority
    if (path === '/downloads') {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    // Blog pages get medium priority
    if (path.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }
    
    // Legal pages get lower priority
    if (path === '/privacy-policy' || path === '/terms-of-service') {
      priority = 0.3;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 