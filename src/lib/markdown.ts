import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(markdown: string): Promise<string> {
  // 首先手动处理图片语法
  let processedMarkdown = markdown.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto my-6 mx-auto rounded-lg shadow-md" />'
  );

  // 将第一个 ## 标题转换为 # 标题（h2 -> h1）
  processedMarkdown = processedMarkdown.replace(/^## (.+)$/m, "# $1");

  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMarkdown);
  return result.toString();
}
