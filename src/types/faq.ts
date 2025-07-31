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

// FAQ 类型定义文件
// 数据处理函数已移至 @/lib/faq-server.ts（服务器端使用）
