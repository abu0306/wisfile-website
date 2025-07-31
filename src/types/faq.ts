export interface FaqItem {
  id: number;
  slug: string;
  question: string;
  answer: string;
  title: string;
  description: string;
  keywords: string[];
  content: string; // HTML content after markdown processing
  headerImageUrl: string; // Header image URL
}

export interface FaqMeta {
  id: number;
  slug: string;
  question: string;
  title: string;
  description: string;
  keywords: string[];
  headerImageUrl: string; // Header image URL
}

// 推荐文章相关类型
export interface ArticleRecommendations {
  series: number[];
  continueReading: number[];
}

export interface FallbackRule {
  similarKeywords: boolean;
  recentArticles: boolean;
  popularArticles: boolean;
}

export interface RecommendationConfig {
  seriesCount: number;
  continueReadingCount: number;
  fallbackStrategy: "random" | "category" | "keywords";
  excludeCurrentArticle: boolean;
}

export interface RecommendationData {
  version: string;
  lastUpdated: string;
  config: RecommendationConfig;
  recommendations: Record<string, ArticleRecommendations>;
  fallbackRules: {
    series: FallbackRule;
    continueReading: FallbackRule;
  };
}

// FAQ 类型定义文件
// 数据处理函数已移至 @/lib/faq-server.ts（服务器端使用）
