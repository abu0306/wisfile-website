import fs from "fs";
import path from "path";

// 构建时生成下载配置的脚本
function generateDownloadConfig() {
  try {
    const downloadsDir = path.join(process.cwd(), "public", "downloads");

    // 读取 downloads 目录
    const files = fs.readdirSync(downloadsDir);

    // 过滤 WisFile 文件（包括 dmg 和 exe）
    const wisFileFiles = files.filter(
      (file) =>
        file.startsWith("WisFile_") &&
        (file.endsWith(".dmg") || file.endsWith(".exe"))
    );

    // 找到对应的文件
    const aarch64File = wisFileFiles.find((file) =>
      file.includes("aarch64.dmg")
    );
    const x64File = wisFileFiles.find((file) => file.includes("x64.dmg"));
    const windowsFile = wisFileFiles.find((file) => file.endsWith(".exe"));

    // 提取版本号
    const versionMatch =
      aarch64File?.match(/WisFile_(\d+\.\d+\.\d+)_/) ||
      x64File?.match(/WisFile_(\d+\.\d+\.\d+)_/) ||
      windowsFile?.match(/WisFile_(\d+\.\d+\.\d+)_/);
    const version = versionMatch ? versionMatch[1] : "1.0.0";

    // 生成配置对象
    const config = {
      aarch64: aarch64File ? `/downloads/${aarch64File}` : null,
      x64: x64File ? `/downloads/${x64File}` : null,
      windows: windowsFile ? `/downloads/${windowsFile}` : null,
      version: version,
    };

    // 生成 TypeScript 文件内容
    const configFileContent = `// 构建时静态生成的下载链接配置
// 这个文件会在构建时由 generate-downloads.js 脚本自动生成

export interface DownloadConfig {
  aarch64: string | null;
  x64: string | null;
  windows?: string | null;
  version: string;
}

// 构建时生成的配置
export const downloadConfig: DownloadConfig = ${JSON.stringify(
      config,
      null,
      2
    )};
`;

    // 写入配置文件
    const configPath = path.join(
      process.cwd(),
      "src",
      "config",
      "downloads.ts"
    );
    fs.writeFileSync(configPath, configFileContent);

    console.log("✅ Download configuration generated successfully:", config);
  } catch (error) {
    console.error("❌ Error generating download configuration:", error);
    process.exit(1);
  }
}

// 直接运行
generateDownloadConfig();
