import { logEvent } from "./eventLogger";
import { downloadConfig } from "@/config/downloads";

export const downloadMacVersion = () => {
  const downloadUrl = downloadConfig.aarch64;

  if (!downloadUrl) {
    console.error("No Apple Silicon version found");
    return;
  }

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "WisFile.dmg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  logEvent("download", {
    download_url: downloadUrl,
    architecture: "aarch64",
    version: downloadConfig.version,
  });
};

export const downloadIntelMacVersion = () => {
  const downloadUrl = downloadConfig.x64;

  if (!downloadUrl) {
    console.error("No Intel version found");
    return;
  }

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "WisFile.dmg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  logEvent("download", {
    download_url: downloadUrl,
    architecture: "x64",
    version: downloadConfig.version,
  });
};

export const downloadWindowsVersion = () => {
  const downloadUrl = downloadConfig.windows;

  if (!downloadUrl) {
    console.error("No Windows version found");
    return;
  }

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "WisFile.exe";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  logEvent("download", {
    download_url: downloadUrl,
    architecture: "windows",
    version: downloadConfig.version,
  });
};
