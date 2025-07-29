import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // 根据部署环境动态设置域名
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.wisfile.ai";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
