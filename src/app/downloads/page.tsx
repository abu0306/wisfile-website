"use client";
import LazyImage from "@/components/LazyImage";
import { message, Popover } from "antd";
import { Download } from "@/components/download";
import { downloadWindowsVersion } from "@/utils/download";

export default function AboutPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const handleMobileDownload = () => {
    messageApi.open({
      content: "Available on desktop only. Please use a laptop.",
      duration: 5,
    });
  };

  return (
    <main className="flex flex-col items-center bg-[#FFFCF6] px-4 md:px-0 md:py-12 pt-8">
      {contextHolder}
      {/* Header */}
      {/* Hero Section */}
      <section className="flex flex-col items-center md:mt-16 md:mb-16 w-full max-w-6xl">
        <div className="relative flex pt-10 md:pt-0 w-full md:min-h-[340px] overflow-hidden">
          {/* Left: Image */}
          <div className="hidden relative md:flex flex-1">
            <LazyImage
              src="/images/screenshot.png"
              alt="Screenshot"
              width={1636}
              height={907}
              className="w-full object-cover"
              priority
            />
          </div>
          {/* Right: Text, overlap 30% */}
          <div className="z-10 flex flex-col flex-1 justify-center items-start md:-ml-[20%]">
            <h1 className="md:block flex flex-col items-center md:-mt-12 md:mb-4 w-full md:w-auto font-bold text-gray-800 text-2xl md:text-6xl leading-[1.2] md:leading-[1.6] whitespace-pre">
              <span>{"Download\n"}</span>
              <span className="text-[#FFB43A]">{"WisFile\n"}</span>
              <span className="text-gray-800">{"for your Computer\n"}</span>
            </h1>
            <div className="md:block flex justify-center mt-2 w-full md:w-auto text-gray-600 text-base md:text-2xl">
              Start your journey to a tidy file system
            </div>
          </div>
        </div>
      </section>

      {/* Download Cards */}
      <section className="flex md:flex-row flex-col justify-center gap-8 mt-7 md:mt-0 mb-24 w-full max-w-6xl">
        {/* Mac Card */}
        <div className="flex flex-col flex-1 items-center bg-white shadow-md px-6 py-10 rounded-xl">
          <div className="mb-4">
            <LazyImage
              src="/images/mac-icon.png"
              alt="Apple"
              width={48}
              height={48}
            />
          </div>
          <div className="mb-2 font-medium text-gray-700 text-lg">
            Download for
          </div>
          <Popover arrow={false} placement={"bottom"} content={<Download />}>
            <button
              className="hidden md:block bg-[#FFB43A] hover:bg-[#e6a12e] shadow mt-2 transition"
              style={{
                width: "194px",
                height: "62px",
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.5)",
                fontWeight: "bold",
                fontSize: "16px",
                color: "#333333",
              }}
            >
              Mac
            </button>
          </Popover>
          <button
            onClick={handleMobileDownload}
            className="md:hidden block bg-[#FFB43A] hover:bg-[#e6a12e] shadow mt-2 transition"
            style={{
              width: "194px",
              height: "62px",
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.5)",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#333333",
            }}
          >
            Mac
          </button>
        </div>
        {/* Windows Card */}
        <div className="flex flex-col flex-1 items-center bg-white shadow-md px-6 py-10 rounded-xl">
          <div className="mb-4">
            <LazyImage
              src="/images/windows-icon.png"
              alt="Windows"
              width={48}
              height={48}
            />
          </div>
          <div className="mb-2 font-medium text-gray-700 text-lg">
            Download for
          </div>
          <button
            onClick={downloadWindowsVersion}
            className="hidden md:block bg-[#FFB43A] hover:bg-[#e6a12e] shadow mt-2 transition"
            style={{
              width: "194px",
              height: "62px",
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.5)",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#333333",
            }}
          >
            Windows
          </button>
          <button
            onClick={handleMobileDownload}
            className="md:hidden block bg-[#FFB43A] hover:bg-[#e6a12e] shadow mt-2 transition"
            style={{
              width: "194px",
              height: "62px",
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.5)",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#333333",
            }}
          >
            Windows
          </button>
        </div>
        {/* Linux Card */}
        <div className="flex flex-col flex-1 items-center bg-white shadow-md px-6 py-10 rounded-xl">
          <div className="mb-4">
            <LazyImage
              src="/images/linux-icon.png"
              alt="Linux"
              width={48}
              height={48}
            />
          </div>
          <div className="mb-2 font-medium text-gray-700 text-lg">
            Download for
          </div>
          <button
            className="bg-gray-200 mt-2 cursor-not-allowed"
            style={{
              width: "194px",
              height: "62px",
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.5)",
              fontWeight: "400",
              fontSize: "16px",
              color: "#6C727F",
            }}
          >
            Linux
          </button>
          <span className="mt-2 text-gray-400 text-xs">Coming Soon</span>
        </div>
      </section>
    </main>
  );
}
