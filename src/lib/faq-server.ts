// 服务器端FAQ数据处理函数
import { markdownToHtml } from "@/lib/markdown";
import {
  getAllFaqs as getAllFaqsFromLoader,
  getFaqBySlug as getFaqBySlugFromLoader,
  searchFaqs as searchFaqsFromLoader,
} from "@/lib/faq-loader";
import { FaqItem, FaqMeta } from "@/types/faq";

/**
 * 获取所有FAQ的元数据（服务器端）
 */
export function getAllFaqs(): FaqMeta[] {
  try {
    const faqs = getAllFaqsFromLoader();
    return faqs.map(
      (faq): FaqMeta => ({
        id: faq.id,
        slug: faq.slug,
        question: faq.question,
        title: faq.title,
        description: faq.description,
        keywords: faq.keywords,
        headerImageUrl: faq.headerImageUrl,
      })
    );
  } catch (error) {
    console.error("Error reading FAQ data:", error);
    return [];
  }
}

/**
 * 根据slug获取FAQ详情（服务器端）
 */
export async function getFaqBySlug(slug: string): Promise<FaqItem | null> {
  try {
    const faqData = getFaqBySlugFromLoader(slug);

    if (!faqData) {
      return null;
    }

    // 转换 markdown 内容为 HTML
    const htmlContent = await markdownToHtml(faqData.回答);

    return {
      id: faqData.id,
      slug: faqData.slug,
      question: faqData.问题,
      answer: faqData.回答,
      title: faqData.title,
      description: faqData.description,
      keywords: faqData.Keywords
        ? faqData.Keywords.split(",").map((k) => k.trim())
        : [],
      content: htmlContent,
      headerImageUrl: faqData.headerImageUrl,
    };
  } catch (error) {
    console.error("Error reading FAQ item:", error);
    return null;
  }
}

/**
 * 搜索FAQ（服务器端）
 */
export function searchFaqs(query: string): FaqMeta[] {
  try {
    const results = searchFaqsFromLoader(query);
    return results.map(
      (faq): FaqMeta => ({
        id: faq.id,
        slug: faq.slug,
        question: faq.question,
        title: faq.title,
        description: faq.description,
        keywords: faq.keywords,
        headerImageUrl: faq.headerImageUrl,
      })
    );
  } catch (error) {
    console.error("Error searching FAQs:", error);
    return [];
  }
}

/**
 * 获取推荐FAQ（服务器端）
 */
export function getFeaturedFaqs(): FaqMeta[] {
  try {
    const allFaqs = getAllFaqs();
    // 返回前6个FAQ作为推荐
    return allFaqs.slice(0, 6);
  } catch (error) {
    console.error("Error getting featured FAQs:", error);
    return [];
  }
}
