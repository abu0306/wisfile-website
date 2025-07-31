import fs from "fs";
import path from "path";

/**
 * FAQ项目接口
 */
export interface FaqItem {
  id: number;
  slug: string;
  问题: string;
  回答: string;
  title: string;
  description: string;
  Keywords: string;
  headerImageUrl: string;
}

/**
 * FAQ元数据接口
 */
export interface FaqMeta {
  id: number;
  slug: string;
  question: string;
  title: string;
  description: string;
  keywords: string[];
  headerImageUrl: string;
}

/**
 * 分片索引接口
 */
export interface ChunkIndex {
  totalChunks: number;
  totalItems: number;
  chunkSize: number;
  chunks: Array<{
    index: number;
    filename: string;
    startIndex: number;
    endIndex: number;
    count: number;
  }>;
  generatedAt: string;
  sourceFile: string;
}

/**
 * 加载分片索引文件
 */
export function loadChunkIndex(): ChunkIndex {
  const indexPath = path.join(
    process.cwd(),
    "src/content/faq-chunks/index.json"
  );

  if (!fs.existsSync(indexPath)) {
    throw new Error(
      "FAQ chunks index file not found. Please run the Excel processing script first."
    );
  }

  try {
    const indexContent = fs.readFileSync(indexPath, "utf8");
    return JSON.parse(indexContent);
  } catch (error) {
    throw new Error(`Failed to parse FAQ chunks index file: ${error}`);
  }
}

/**
 * 加载指定的FAQ分片数据
 */
export function loadFaqChunk(chunkIndex: number): FaqItem[] {
  const chunkPath = path.join(
    process.cwd(),
    `src/content/faq-chunks/faq-chunk-${chunkIndex}.json`
  );

  if (!fs.existsSync(chunkPath)) {
    throw new Error(`FAQ chunk ${chunkIndex} not found at ${chunkPath}`);
  }

  try {
    const chunkContent = fs.readFileSync(chunkPath, "utf8");
    return JSON.parse(chunkContent);
  } catch (error) {
    throw new Error(`Failed to parse FAQ chunk ${chunkIndex}: ${error}`);
  }
}

/**
 * 获取所有FAQ的元数据（不包含完整回答内容）
 */
export function getAllFaqs(): FaqMeta[] {
  try {
    const index = loadChunkIndex();
    const allFaqs: FaqMeta[] = [];

    for (const chunk of index.chunks) {
      const chunkData = loadFaqChunk(chunk.index);

      const chunkFaqs = chunkData.map(
        (item): FaqMeta => ({
          id: item.id,
          slug: item.slug,
          question: item.问题,
          title: item.title,
          description: item.description,
          keywords: item.Keywords
            ? item.Keywords.split(",")
                .map((k) => k.trim())
                .filter((k) => k)
            : [],
          headerImageUrl: item.headerImageUrl,
        })
      );

      allFaqs.push(...chunkFaqs);
    }

    return allFaqs;
  } catch (error) {
    console.error("Error loading FAQ data:", error);
    return [];
  }
}

/**
 * 根据ID查找特定的FAQ项目
 */
export function getFaqById(id: number): FaqItem | null {
  try {
    const index = loadChunkIndex();

    for (const chunk of index.chunks) {
      const chunkData = loadFaqChunk(chunk.index);
      const faq = chunkData.find((item) => item.id === id);

      if (faq) {
        return faq;
      }
    }

    return null;
  } catch (error) {
    console.error("Error finding FAQ by ID:", error);
    return null;
  }
}

/**
 * 根据slug查找特定的FAQ项目
 */
export function getFaqBySlug(slug: string): FaqItem | null {
  try {
    const index = loadChunkIndex();

    for (const chunk of index.chunks) {
      const chunkData = loadFaqChunk(chunk.index);
      const faq = chunkData.find((item) => item.slug === slug);

      if (faq) {
        return faq;
      }
    }

    return null;
  } catch (error) {
    console.error("Error finding FAQ by slug:", error);
    return null;
  }
}

/**
 * 搜索FAQ（根据问题和关键词）
 */
export function searchFaqs(query: string, limit: number = 10): FaqMeta[] {
  try {
    const allFaqs = getAllFaqs();
    const lowerQuery = query.toLowerCase();

    const results = allFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lowerQuery) ||
        faq.title.toLowerCase().includes(lowerQuery) ||
        faq.description.toLowerCase().includes(lowerQuery) ||
        faq.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery)
        )
    );

    return results.slice(0, limit);
  } catch (error) {
    console.error("Error searching FAQs:", error);
    return [];
  }
}

/**
 * 获取分页的FAQ数据
 */
export function getPaginatedFaqs(
  page: number = 1,
  pageSize: number = 20
): {
  faqs: FaqMeta[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
} {
  try {
    const allFaqs = getAllFaqs();
    const totalItems = allFaqs.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const faqs = allFaqs.slice(startIndex, endIndex);

    return {
      faqs,
      totalPages,
      totalItems,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error getting paginated FAQs:", error);
    return {
      faqs: [],
      totalPages: 0,
      totalItems: 0,
      currentPage: 1,
    };
  }
}

/**
 * 获取FAQ统计信息
 */
export function getFaqStats(): {
  totalItems: number;
  totalChunks: number;
  chunkSize: number;
  lastUpdated: string;
} {
  try {
    const index = loadChunkIndex();
    return {
      totalItems: index.totalItems,
      totalChunks: index.totalChunks,
      chunkSize: index.chunkSize,
      lastUpdated: index.generatedAt,
    };
  } catch (error) {
    console.error("Error getting FAQ stats:", error);
    return {
      totalItems: 0,
      totalChunks: 0,
      chunkSize: 0,
      lastUpdated: "",
    };
  }
}
