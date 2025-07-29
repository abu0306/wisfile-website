import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // 根据部署环境动态设置域名
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.wisfile.ai";

  // 只包含最核心的页面，其余页面由 next-sitemap 处理
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
