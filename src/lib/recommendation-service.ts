import fs from "fs";
import path from "path";
import {
  RecommendationData,
  ArticleRecommendations,
  FaqMeta,
} from "@/types/faq";

/**
 * 推荐服务类
 */
export class RecommendationService {
  private static instance: RecommendationService;
  private recommendationData: RecommendationData | null = null;

  private constructor() {}

  public static getInstance(): RecommendationService {
    if (!RecommendationService.instance) {
      RecommendationService.instance = new RecommendationService();
    }
    return RecommendationService.instance;
  }

  /**
   * 加载推荐配置数据
   */
  private loadRecommendationData(): RecommendationData {
    if (this.recommendationData) {
      return this.recommendationData;
    }

    try {
      const filePath = path.join(
        process.cwd(),
        "src/content/faq-recommendations.json"
      );
      const fileContent = fs.readFileSync(filePath, "utf-8");
      this.recommendationData = JSON.parse(fileContent);
      return this.recommendationData!;
    } catch (error) {
      console.error("Error loading recommendation data:", error);
      // 返回默认配置
      return {
        version: "1.0",
        lastUpdated: new Date().toISOString(),
        config: {
          seriesCount: 5,
          continueReadingCount: 3,
          fallbackStrategy: "random",
          excludeCurrentArticle: true,
        },
        recommendations: {},
        fallbackRules: {
          series: {
            similarKeywords: true,
            recentArticles: false,
            popularArticles: true,
          },
          continueReading: {
            similarKeywords: true,
            recentArticles: true,
            popularArticles: false,
          },
        },
      };
    }
  }

  /**
   * 获取指定文章的推荐文章
   */
  public getRecommendations(
    articleId: number,
    allFaqs: FaqMeta[]
  ): {
    series: FaqMeta[];
    continueReading: FaqMeta[];
  } {
    // 过滤掉当前文章
    const otherArticles = allFaqs.filter((faq) => faq.id !== articleId);

    // 随机打乱文章顺序
    const shuffled = this.shuffleArray([...otherArticles]);

    return {
      series: shuffled.slice(0, 5),
      continueReading: shuffled.slice(5, 8),
    };
  }

  /**
   * 随机打乱数组
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * 生成回退推荐
   */
  private generateFallbackRecommendations(
    articleId: number,
    allFaqs: FaqMeta[],
    data: RecommendationData
  ): ArticleRecommendations {
    const currentArticle = allFaqs.find((faq) => faq.id === articleId);
    const availableArticles = allFaqs.filter((faq) => faq.id !== articleId);

    let seriesIds: number[] = [];
    let continueReadingIds: number[] = [];

    switch (data.config.fallbackStrategy) {
      case "keywords":
        if (currentArticle) {
          seriesIds = this.getRecommendationsByKeywords(
            currentArticle,
            availableArticles,
            data.config.seriesCount
          );
          continueReadingIds = this.getRecommendationsByKeywords(
            currentArticle,
            availableArticles.filter((faq) => !seriesIds.includes(faq.id)),
            data.config.continueReadingCount
          );
        }
        break;

      case "random":
      default:
        seriesIds = this.getRandomRecommendations(
          availableArticles,
          data.config.seriesCount
        );
        continueReadingIds = this.getRandomRecommendations(
          availableArticles.filter((faq) => !seriesIds.includes(faq.id)),
          data.config.continueReadingCount
        );
        break;
    }

    return {
      series: seriesIds,
      continueReading: continueReadingIds,
    };
  }

  /**
   * 基于关键词获取推荐
   */
  private getRecommendationsByKeywords(
    currentArticle: FaqMeta,
    availableArticles: FaqMeta[],
    count: number
  ): number[] {
    const currentKeywords = currentArticle.keywords.map((k) => k.toLowerCase());

    // 计算相似度分数
    const scored = availableArticles.map((article) => {
      const articleKeywords = article.keywords.map((k) => k.toLowerCase());
      const commonKeywords = currentKeywords.filter((k) =>
        articleKeywords.some((ak) => ak.includes(k) || k.includes(ak))
      );

      return {
        id: article.id,
        score: commonKeywords.length,
      };
    });

    // 按分数排序并取前N个
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((item) => item.id);
  }

  /**
   * 获取随机推荐
   */
  private getRandomRecommendations(
    availableArticles: FaqMeta[],
    count: number
  ): number[] {
    const shuffled = [...availableArticles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((faq) => faq.id);
  }

  /**
   * 根据ID数组获取FAQ对象
   */
  private getFaqsByIds(ids: number[], allFaqs: FaqMeta[]): FaqMeta[] {
    return ids
      .map((id) => allFaqs.find((faq) => faq.id === id))
      .filter((faq): faq is FaqMeta => faq !== undefined);
  }

  /**
   * 更新推荐配置
   */
  public updateRecommendations(
    articleId: number,
    recommendations: ArticleRecommendations
  ): void {
    const data = this.loadRecommendationData();
    data.recommendations[articleId.toString()] = recommendations;
    data.lastUpdated = new Date().toISOString();

    try {
      const filePath = path.join(
        process.cwd(),
        "src/content/faq-recommendations.json"
      );
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      this.recommendationData = data; // 更新缓存
    } catch (error) {
      console.error("Error updating recommendation data:", error);
      throw error;
    }
  }
}

/**
 * 获取推荐服务实例
 */
export function getRecommendationService(): RecommendationService {
  return RecommendationService.getInstance();
}
