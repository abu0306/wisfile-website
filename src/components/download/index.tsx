import { downloadIntelMacVersion, downloadMacVersion } from "@/utils/download";

export const Download = () => {
  const handleAppleDownload = () => {
    downloadMacVersion();
  };

  const handleIntelDownload = () => {
    downloadIntelMacVersion();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        onClick={handleAppleDownload}
        className="pb-3 border-[#F3F3F4] border-b font-semibold text-base cursor-pointer"
      >
        Apple silicon
      </div>

      <div
        onClick={handleIntelDownload}
        className="pt-3 font-semibold text-base cursor-pointer"
      >
        Intel chip
      </div>
    </div>
  );
};
