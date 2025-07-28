export interface FaqItem {
  slug: string;
  question: string;
  answer: string;
  title: string;
  description: string;
  keywords: string[];
  content: string; // HTML content after markdown processing
}

export interface FaqMeta {
  slug: string;
  question: string;
  title: string;
  description: string;
  keywords: string[];
}

// FAQ 数据处理函数
import { markdownToHtml } from "@/lib/markdown";
import faqData from "@/content/faq-data.json";

interface JsonFaqItem {
  问题: string;
  回答: string;
  title: string;
  description: string;
  Keywords: string;
}

// 生成 slug
function generateSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // 移除特殊字符
    .replace(/\s+/g, "-") // 空格替换为连字符
    .replace(/-+/g, "-") // 多个连字符合并为一个
    .trim()
    .substring(0, 100); // 限制长度
}

export function getAllFaqs(): FaqMeta[] {
  try {
    const typedFaqData = faqData as JsonFaqItem[];

    return typedFaqData.map((item) => ({
      slug: generateSlug(item["问题"]),
      question: item["问题"],
      title: item.title,
      description: item.description,
      keywords: item.Keywords
        ? item.Keywords.split(",").map((k) => k.trim())
        : [],
    }));
  } catch (error) {
    console.error("Error reading FAQ data:", error);
    return [];
  }
}

export async function getFaqBySlug(slug: string): Promise<FaqItem | null> {
  try {
    const typedFaqData = faqData as JsonFaqItem[];

    const item = typedFaqData.find(
      (item) => generateSlug(item["问题"]) === slug
    );

    if (!item) {
      return null;
    }

    // 转换 markdown 内容为 HTML
    const htmlContent = await markdownToHtml(item["回答"]);

    return {
      slug: generateSlug(item["问题"]),
      question: item["问题"],
      answer: item["回答"],
      title: item.title,
      description: item.description,
      keywords: item.Keywords
        ? item.Keywords.split(",").map((k) => k.trim())
        : [],
      content: htmlContent,
    };
  } catch (error) {
    console.error("Error reading FAQ item:", error);
    return null;
  }
}

export function searchFaqs(query: string): FaqMeta[] {
  const allFaqs = getAllFaqs();
  const searchTerm = query.toLowerCase();

  return allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.title.toLowerCase().includes(searchTerm) ||
      faq.description.toLowerCase().includes(searchTerm) ||
      faq.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm))
  );
}

export function getFeaturedFaqs(): FaqMeta[] {
  const allFaqs = getAllFaqs();
  // 返回前6个FAQ作为推荐
  return allFaqs.slice(0, 6);
}
