const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

/**
 * 生成URL友好的slug（保留用于URL路由）
 */
function generateSlug(question) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 100);
}

/**
 * 根据文章ID获取FAQ内容图片URL
 */
function getFaqContentImageUrl(articleId) {
  const totalContentImages = 2000;

  if (articleId <= totalContentImages) {
    return `https://cdn.wisland.ai/wisfileai/wisfilefaq/${articleId}.png`;
  }

  // 超过2000篇的文章循环使用1-2000的图片
  const imageNumber =
    ((articleId - totalContentImages - 1) % totalContentImages) + 1;
  return `https://cdn.wisland.ai/wisfileai/wisfilefaq/${imageNumber}.png`;
}

/**
 * 在文章段落中随机插入图片
 */
function insertRandomImageInContent(content, articleId) {
  if (!content || typeof content !== "string") {
    return content;
  }

  // 获取对应的图片URL
  const imageUrl = getFaqContentImageUrl(articleId);

  // 将内容按段落分割（以双换行符分割）
  const paragraphs = content.split("\n\n");

  // 如果段落数少于2个，就不插入图片
  if (paragraphs.length < 2) {
    return content;
  }

  // 随机选择一个位置插入图片（不在第一段和最后一段）
  const insertPosition =
    Math.floor(Math.random() * (paragraphs.length - 1)) + 1;

  // 创建图片markdown
  const imageMarkdown = `![WisFile FAQ Image](${imageUrl})`;

  // 在指定位置插入图片
  paragraphs.splice(insertPosition, 0, imageMarkdown);

  // 重新组合内容
  return paragraphs.join("\n\n");
}

/**
 * 随机获取Header图片URL
 */
function getRandomHeaderImageUrl() {
  const randomNumber = Math.floor(Math.random() * 14) + 1;
  return `https://cdn.wisland.ai/wisfileai/headerimage/headerImage${randomNumber}.jpg`;
}

/**
 * 处理Excel文件并生成分片JSON文件
 */
function processExcelToChunks(excelFilePath) {
  console.log("🚀 开始处理Excel文件:", excelFilePath);

  // 读取Excel文件
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet);

  console.log(`📊 读取到 ${rawData.length} 条数据`);

  // 创建输出目录
  const outputDir = "./src/content/faq-chunks";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const CHUNK_SIZE = 200;

  // 处理数据
  const processedData = rawData.map((item, index) => {
    const id = index + 1;
    const question = item["问题"] || item["Question"] || "";
    let answer = item["回答"] || item["Answer"] || "";

    // 替换回答中的本地图片路径为OSS URL
    if (answer) {
      // 替换function-screenshot目录下的图片
      answer = answer.replace(
        /!\[([^\]]*)\]\(\/images\/FAQ\/function-screenshot\/[^)]+\)/g,
        (match, alt) => {
          const contentImageUrl = getFaqContentImageUrl(id);
          return `![${alt}](${contentImageUrl})`;
        }
      );

      // 替换其他FAQ目录下的图片
      answer = answer.replace(
        /!\[([^\]]*)\]\(\/images\/FAQ\/[^)]+\)/g,
        (match, alt) => {
          const contentImageUrl = getFaqContentImageUrl(id);
          return `![${alt}](${contentImageUrl})`;
        }
      );

      // 在段落中随机插入图片
      answer = insertRandomImageInContent(answer, id);
    }

    // 处理标题
    const title = item["title"] || item["Title"] || `${question}-WisFile`;

    // 处理描述
    let description = item["description"] || item["Description"] || "";

    // 如果没有description，从回答中提取前150字符
    if (!description && answer) {
      description = answer
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // 移除图片标记
        .replace(/#{1,6}\s*/g, "") // 移除标题标记
        .replace(/\*\*([^*]+)\*\*/g, "$1") // 移除粗体标记
        .trim()
        .substring(0, 150);
    }

    const keywords = item["Keywords"] || item["关键词"] || "";

    return {
      id: id,
      slug: generateSlug(question),
      问题: question,
      回答: answer,
      title: title,
      description: description,
      Keywords: keywords,
      headerImageUrl: getRandomHeaderImageUrl(),
    };
  });

  // 分片处理
  const chunks = [];
  for (let i = 0; i < processedData.length; i += CHUNK_SIZE) {
    const chunk = processedData.slice(i, i + CHUNK_SIZE);
    const chunkIndex = Math.floor(i / CHUNK_SIZE) + 1;

    chunks.push({
      index: chunkIndex,
      data: chunk,
      startIndex: i + 1,
      endIndex: i + chunk.length,
      count: chunk.length,
    });
  }

  // 生成分片文件
  chunks.forEach((chunk) => {
    const filename = `faq-chunk-${chunk.index}.json`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(chunk.data, null, 2), "utf8");
    console.log(
      `📁 生成 ${filename}: 第${chunk.startIndex}-${chunk.endIndex}条 (${chunk.count}条数据)`
    );
  });

  // 生成索引文件
  const indexData = {
    totalChunks: chunks.length,
    totalItems: processedData.length,
    chunkSize: CHUNK_SIZE,
    chunks: chunks.map((chunk) => ({
      index: chunk.index,
      filename: `faq-chunk-${chunk.index}.json`,
      startIndex: chunk.startIndex,
      endIndex: chunk.endIndex,
      count: chunk.count,
    })),
    generatedAt: new Date().toISOString(),
    sourceFile: path.basename(excelFilePath),
  };

  const indexPath = path.join(outputDir, "index.json");
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), "utf8");
  console.log(`📋 生成索引文件: ${indexPath}`);

  // 生成完整数据备份
  const fullDataPath = "./src/content/faq-data-new.json";
  fs.writeFileSync(
    fullDataPath,
    JSON.stringify(processedData, null, 2),
    "utf8"
  );
  console.log(`💾 生成完整数据备份: ${fullDataPath}`);

  console.log("\n🎉 处理完成！");
  console.log(`📊 总文章数: ${processedData.length}`);
  console.log(`📁 分片数量: ${chunks.length}`);
  console.log(`📦 每片大小: 最多${CHUNK_SIZE}条`);

  return { chunks, totalItems: processedData.length };
}

// 如果直接运行此脚本
if (require.main === module) {
  const excelFile =
    process.argv[2] || "./src/content/WisFile_FAQ内容_数据表_表格.xlsx";

  if (!fs.existsSync(excelFile)) {
    console.error("❌ Excel文件不存在:", excelFile);
    process.exit(1);
  }

  try {
    processExcelToChunks(excelFile);
  } catch (error) {
    console.error("❌ 处理过程中出现错误:", error);
    process.exit(1);
  }
}

module.exports = { processExcelToChunks };
