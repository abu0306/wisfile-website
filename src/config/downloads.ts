// 构建时静态生成的下载链接配置
// 这个文件会在构建时由 generate-downloads.js 脚本自动生成

export interface DownloadConfig {
  aarch64: string | null;
  x64: string | null;
  version: string;
}

// 构建时生成的配置
export const downloadConfig: DownloadConfig = {
  "aarch64": "/downloads/WisFile_1.2.17_aarch64.dmg",
  "x64": "/downloads/WisFile_1.2.17_x64.dmg",
  "version": "1.2.17"
};
