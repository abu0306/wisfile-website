/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.wisfile.ai",
  generateRobotsTxt: true, // 生成 robots.txt
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: [], // 排除的页面
  generateIndexSitemap: false,
  autoLastmod: true,
  outDir: "public",
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
