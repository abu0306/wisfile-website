const fs = require("fs");
const path = require("path");

/**
 * 验证生成的分片文件
 */
function verifyChunks() {
  console.log("🔍 开始验证分片文件...");

  const chunksDir = "./src/content/faq-chunks";
  const indexPath = path.join(chunksDir, "index.json");

  // 检查索引文件是否存在
  if (!fs.existsSync(indexPath)) {
    console.error("❌ 索引文件不存在:", indexPath);
    return false;
  }

  // 读取索引文件
  const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  console.log(`📊 索引信息:`);
  console.log(`   总分片数: ${indexData.totalChunks}`);
  console.log(`   总条目数: ${indexData.totalItems}`);
  console.log(`   分片大小: ${indexData.chunkSize}`);
  console.log(`   生成时间: ${indexData.generatedAt}`);

  let totalVerifiedItems = 0;
  let chunksWithImages = 0;
  let itemsWithContentImages = 0;
  let itemsWithHeaderImages = 0;
  let idErrors = [];
  let expectedId = 1;

  // 验证每个分片文件
  for (const chunk of indexData.chunks) {
    const chunkPath = path.join(chunksDir, chunk.filename);

    if (!fs.existsSync(chunkPath)) {
      console.error(`❌ 分片文件不存在: ${chunk.filename}`);
      continue;
    }

    const chunkData = JSON.parse(fs.readFileSync(chunkPath, "utf8"));

    if (chunkData.length !== chunk.count) {
      console.error(
        `❌ 分片 ${chunk.filename} 数据条数不匹配: 期望 ${chunk.count}, 实际 ${chunkData.length}`
      );
      continue;
    }

    console.log(`✅ 分片 ${chunk.filename}: ${chunkData.length} 条数据`);

    // 检查数据结构和ID连续性
    let chunkHasImages = false;
    for (const item of chunkData) {
      // 检查必要字段
      if (
        !item.id ||
        !item.slug ||
        !item.问题 ||
        !item.回答 ||
        !item.headerImageUrl
      ) {
        console.error(`❌ 分片 ${chunk.filename} 中有条目缺少必要字段`);
        continue;
      }

      // 检查ID连续性
      if (item.id !== expectedId) {
        idErrors.push(
          `ID不连续: 期望 ${expectedId}, 实际 ${item.id} (分片 ${chunk.filename})`
        );
      }
      expectedId++;

      // 检查Header图片URL
      if (
        item.headerImageUrl.includes("cdn.wisland.ai/wisfileai/headerimage/")
      ) {
        itemsWithHeaderImages++;
      }

      // 检查回答中的内容图片
      if (item.回答.includes("cdn.wisland.ai/wisfileai/wisfilefaq/")) {
        itemsWithContentImages++;
        chunkHasImages = true;
      }

      totalVerifiedItems++;
    }

    if (chunkHasImages) {
      chunksWithImages++;
    }
  }

  console.log("\n📈 验证统计:");
  console.log(`   验证条目总数: ${totalVerifiedItems}`);
  console.log(`   包含内容图片的条目: ${itemsWithContentImages}`);
  console.log(`   包含Header图片的条目: ${itemsWithHeaderImages}`);
  console.log(`   包含图片的分片数: ${chunksWithImages}`);

  // 报告ID错误
  if (idErrors.length > 0) {
    console.log("\n❌ ID连续性错误:");
    idErrors.slice(0, 10).forEach((error) => console.log(`   ${error}`));
    if (idErrors.length > 10) {
      console.log(`   ... 还有 ${idErrors.length - 10} 个错误`);
    }
  } else {
    console.log("\n✅ ID连续性检查通过");
  }

  // 验证完整数据备份
  const fullDataPath = "./src/content/faq-data-new.json";
  if (fs.existsSync(fullDataPath)) {
    const fullData = JSON.parse(fs.readFileSync(fullDataPath, "utf8"));
    console.log(`📄 完整数据备份: ${fullData.length} 条数据`);

    if (fullData.length !== totalVerifiedItems) {
      console.error(
        `❌ 完整数据条数与分片总数不匹配: ${fullData.length} vs ${totalVerifiedItems}`
      );
    }
  } else {
    console.error("❌ 完整数据备份文件不存在");
  }

  // 检查图片URL格式
  console.log("\n🖼️  图片URL验证:");

  // 随机检查几个条目的图片URL
  const sampleChunk = JSON.parse(
    fs.readFileSync(path.join(chunksDir, "faq-chunk-1.json"), "utf8")
  );
  const sampleItems = sampleChunk.slice(0, 3);

  for (const item of sampleItems) {
    console.log(`   ID: ${item.id} - 问题: ${item.问题.substring(0, 50)}...`);
    console.log(`   Header图片: ${item.headerImageUrl}`);

    // 检查回答中是否有图片
    const imageMatches = item.回答.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
    if (imageMatches) {
      console.log(`   内容图片: ${imageMatches.length} 张`);
      imageMatches.forEach((match, index) => {
        console.log(`     ${index + 1}. ${match}`);
      });
    } else {
      console.log(`   内容图片: 无`);
    }
    console.log("");
  }

  console.log("🎉 验证完成!");
  return idErrors.length === 0;
}

// 如果直接运行此脚本
if (require.main === module) {
  verifyChunks();
}

module.exports = { verifyChunks };
