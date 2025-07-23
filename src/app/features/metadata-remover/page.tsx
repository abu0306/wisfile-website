"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import Link from "next/link";
import LazyImage from "@/components/LazyImage";
import UploadIcon from "@/assets/svg/upload.svg";
import Remover001 from "@/assets/svg/remover-001.svg";
import Remover002 from "@/assets/svg/remover-002.svg";
import Remover003 from "@/assets/svg/remover-003.svg";
import DelIcon from "@/assets/svg/delete.svg";
import { PDFDocument } from "pdf-lib";

interface MetadataItem {
  key: string;
  value: string;
}

interface FileInfo {
  name: string;
  size: string;
  pageCount: number;
}

type ProcessingState = "idle" | "processing" | "completed";

export default function MetadataRemoverPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [metadata, setMetadata] = useState<MetadataItem[]>([]);
  const [cleanedMetadata, setCleanedMetadata] = useState<MetadataItem[]>([]);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    AOS.init({
      once: true,
      easing: "ease-in-out",
      disable: "mobile",
    });
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Generic function to extract metadata from PDF data
  const extractPdfMetadata = async (
    pdfData: ArrayBuffer | Uint8Array,
    fileName: string,
    fileSize: number
  ): Promise<MetadataItem[]> => {
    try {
      const pdfDoc = await PDFDocument.load(pdfData);

      // Extract basic file info
      const pageCount = pdfDoc.getPageCount();
      const fileSizeFormatted = formatFileSize(fileSize);

      // Extract metadata
      const metadataItems: MetadataItem[] = [];

      // Try to get metadata using pdf-lib methods
      try {
        const title = pdfDoc.getTitle();
        if (title) metadataItems.push({ key: "Title", value: title });
      } catch {}

      try {
        const author = pdfDoc.getAuthor();
        if (author) metadataItems.push({ key: "Author", value: author });
      } catch {}

      try {
        const subject = pdfDoc.getSubject();
        if (subject) metadataItems.push({ key: "Subject", value: subject });
      } catch {}

      try {
        const keywords = pdfDoc.getKeywords();
        if (keywords) metadataItems.push({ key: "Keywords", value: keywords });
      } catch {}

      try {
        const creator = pdfDoc.getCreator();
        if (creator) metadataItems.push({ key: "Creator", value: creator });
      } catch {}

      try {
        const creationDate = pdfDoc.getCreationDate();
        if (creationDate) {
          metadataItems.push({
            key: "Creation Date",
            value: creationDate.toISOString().split("T")[0],
          });
        }
      } catch {}

      try {
        const modificationDate = pdfDoc.getModificationDate();
        if (modificationDate) {
          metadataItems.push({
            key: "Modification Date",
            value: modificationDate.toISOString().split("T")[0],
          });
        }
      } catch {}

      // Add file-specific metadata
      metadataItems.push({ key: "File Size", value: fileSizeFormatted });
      metadataItems.push({ key: "Page Count", value: pageCount.toString() });

      // Add some additional info
      metadataItems.push({ key: "File Name", value: fileName });
      metadataItems.push({ key: "File Type", value: "PDF Document" });

      return metadataItems;
    } catch (error) {
      console.error("Error extracting metadata:", error);
      return [
        {
          key: "Error",
          value: "Failed to extract metadata from this PDF file",
        },
      ];
    }
  };

  const extractMetadata = async (file: File) => {
    setIsExtracting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const metadataItems = await extractPdfMetadata(
        arrayBuffer,
        file.name,
        file.size
      );

      // Set file info for display
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      const fileSize = formatFileSize(file.size);

      setFileInfo({
        name: file.name,
        size: fileSize,
        pageCount: pageCount,
      });

      setMetadata(metadataItems);
    } catch (error) {
      console.error("Error extracting metadata:", error);
      setMetadata([
        {
          key: "Error",
          value: "Failed to extract metadata from this PDF file",
        },
      ]);
    } finally {
      setIsExtracting(false);
    }
  };

  const extractCleanedMetadata = async (
    cleanedPdfBytes: Uint8Array,
    originalFileName: string
  ) => {
    try {
      const metadataItems = await extractPdfMetadata(
        cleanedPdfBytes,
        originalFileName,
        cleanedPdfBytes.length
      );

      setCleanedMetadata(metadataItems);
    } catch (error) {
      console.error("Error extracting cleaned metadata:", error);
      setCleanedMetadata([
        {
          key: "Error",
          value: "Failed to extract metadata from cleaned PDF file",
        },
      ]);
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setShowMetadata(true);
      await extractMetadata(file);
    }
  };

  const removeMetadata = async (): Promise<Uint8Array | null> => {
    if (!selectedFile) return null;

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Remove metadata
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setCreator("");
      pdfDoc.setProducer("");
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());

      // Save the cleaned PDF
      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
    } catch (error) {
      console.error("Error removing metadata:", error);
      return null;
    }
  };

  const handleStart = async () => {
    setProcessingState("processing");
    setProcessingProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const cleanedPdfBytes = await removeMetadata();
      clearInterval(progressInterval);
      setProcessingProgress(100);

      if (cleanedPdfBytes && selectedFile) {
        // Save cleaned file data for download
        setCleanedFileData(cleanedPdfBytes);

        // Extract metadata from cleaned file
        await extractCleanedMetadata(cleanedPdfBytes, selectedFile.name);

        // Set processing state to completed
        setProcessingState("completed");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setProcessingState("idle");
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setShowMetadata(false);
    setProcessingState("idle");
    setProcessingProgress(0);
    setMetadata([]);
    setCleanedMetadata([]);
    setFileInfo(null);
    setCleanedFileData(null);
  };

  const [cleanedFileData, setCleanedFileData] = useState<Uint8Array | null>(
    null
  );

  const handleDownload = () => {
    if (selectedFile && cleanedFileData) {
      // Create download link for the cleaned file
      const blob = new Blob([cleanedFileData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setShowMetadata(false);
    setProcessingState("idle");
    setProcessingProgress(0);
    setMetadata([]);
    setCleanedMetadata([]);
    setFileInfo(null);
    setCleanedFileData(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="flex flex-col items-center bg-[#FEFCF7] w-full min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center mt-16 md:mt-24 px-4 md:px-0 max-w-6xl">
        <h1
          className="mb-4 px-4 md:px-0"
          style={{
            fontWeight: "bold",
            fontSize: "42px",
            color: "#333333",
            textAlign: "center",
            fontStyle: "normal",
          }}
        >
          Metadata Remover
        </h1>
        <p
          className="px-4 md:px-0 text-center max-w-3xl"
          style={{
            fontWeight: "400",
            fontSize: "18px",
            color: "#333333",
            marginTop: "6px",
            marginBottom: "22px",
          }}
        >
          Let AI strip your sensitive metadata, ensuring your privacy.
        </p>
        <p
          className="mb-12 px-4 md:px-0 text-center"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#333333",
          }}
        >
          Totally for Free!
        </p>
      </section>

      {/* File Upload and Metadata Display Section */}
      <section className="flex flex-col items-center mb-16 md:mb-20 px-4 md:px-0 w-full max-w-6xl">
        {!showMetadata ? (
          /* File Upload Area */
          <div className="flex flex-col items-center w-full">
            <div
              className="relative flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              style={{
                width: "1200px",
                height: "300px",
                borderRadius: "24px",
                border: "4px solid rgba(255,255,255,0.5)",
                maxWidth: "100%",
              }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Upload Icon */}
                <div className="mb-6">
                  <UploadIcon
                    className="text-[#FFD36A]"
                    style={{ width: "94px", height: "94px" }}
                  />
                </div>

                {/* Text Content */}
                <div>
                  <h3
                    style={{
                      fontWeight: "400",
                      fontSize: "30px",
                      color: "#999999",
                    }}
                  >
                    Only supports PDF format
                  </h3>
                  <p
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#999999",
                      marginTop: "28px",
                    }}
                  >
                    1 File One Time
                  </p>
                </div>
              </div>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl space-y-6">
            {/* Table-style Metadata Display */}
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Table Header */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="h-[37px] px-6 bg-gray-50 flex items-center">
                  <h3 className="font-medium text-base text-gray-700">Files</h3>
                </div>
                <div className="h-[37px] px-6 bg-gray-50 flex items-center">
                  <h3 className="font-medium text-base text-gray-700">
                    Metadata
                  </h3>
                </div>
              </div>

              {/* Table Content */}
              <div className="grid grid-cols-2 min-h-[400px]">
                {/* Left Side - File Info */}
                <div className="p-6 border-r border-gray-200 flex flex-col">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PDF</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">
                        {fileInfo?.name || selectedFile?.name || "Unknown file"}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove file"
                    >
                      <DelIcon className="text-[#AAAAAC] w-4 h-4 md:w-auto md:h-auto" />
                    </button>
                  </div>
                </div>

                {/* Right Side - Metadata Info */}
                <div className="p-6">
                  {isExtracting ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-gray-600">
                        Extracting metadata...
                      </span>
                    </div>
                  ) : processingState === "completed" ? (
                    cleanedMetadata.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No metadata available in cleaned file
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cleanedMetadata.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center py-2 border-b border-gray-100 last:border-b-0"
                          >
                            <span
                              className="w-[150px] flex-shrink-0"
                              style={{
                                fontWeight: "400",
                                fontSize: "14px",
                                color: "#999999",
                              }}
                            >
                              {item.key}
                            </span>
                            <span
                              className="flex-1"
                              style={{
                                fontWeight: "500",
                                fontSize: "14px",
                                color: "#333333",
                              }}
                            >
                              {item.value || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  ) : metadata.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No metadata available
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {metadata.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span
                            className="w-[150px] flex-shrink-0"
                            style={{
                              fontWeight: "400",
                              fontSize: "14px",
                              color: "#999999",
                            }}
                          >
                            {item.key}
                          </span>
                          <span
                            className="flex-1"
                            style={{
                              fontWeight: "500",
                              fontSize: "14px",
                              color: "#333333",
                            }}
                          >
                            {item.value || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {processingState === "processing" && (
              <div className="rounded-lg px-6 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Removing the Metadata...
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="rounded-lg flex flex-col items-center">
              {processingState === "completed" && (
                <span className="text-green-600 font-medium">
                  Metadata removed.
                </span>
              )}

              <div className="flex justify-center gap-4">
                {processingState === "processing" ? (
                  <div className="flex items-center gap-2 px-8 py-3 bg-gray-200 rounded-full">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Processing...</span>
                  </div>
                ) : processingState === "completed" ? (
                  <div className="mt-[30px] flex gap-[36px]">
                    <button
                      onClick={handleDownload}
                      className="bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md rounded-full font-semibold text-gray-900 transition"
                      style={{
                        width: "199px",
                        height: "62px",
                      }}
                    >
                      Download
                    </button>
                    <button
                      onClick={handleCancel}
                      className="shadow-md rounded-full font-semibold text-gray-700 transition"
                      style={{
                        width: "199px",
                        height: "62px",
                        border: "1px solid #999999",
                        color: "#999999",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleStart}
                    className="font-semibold text-gray-900 transition shadow-md"
                    style={{
                      width: "199px",
                      height: "62px",
                      background: "#F9D37A",
                      borderRadius: "32px",
                      marginTop: "26px",
                    }}
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 100% Local & Free Section */}
      <section className="flex flex-col items-center mb-16 md:mb-20 px-4 md:px-0 w-full max-w-6xl">
        <div
          className="flex flex-col md:flex-row items-center gap-8 p-8"
          style={{
            width: "1200px",
            height: "187px",
            background: "#FFF8E7",
            borderRadius: "24px",
            maxWidth: "100%",
          }}
        >
          <div className="flex-1">
            <h2 className="font-bold text-xl md:text-2xl mb-4">
              100% Local & Free AI File Manager
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              Wisfile：A free local AI tool, which can auto-renames, categorizes
              and organizes your files securely, turning chaos to clarity.
            </p>
            <Link href="/downloads">
              <button
                className="font-semibold text-gray-900 transition shadow-md"
                style={{
                  width: "333px",
                  height: "48px",
                  background:
                    "linear-gradient(91deg, #FFDB49 0%, #FFF1B7 100%)",
                  borderRadius: "24px",
                }}
              >
                Try it for Free
              </button>
            </Link>
          </div>
          <div className="flex-shrink-0">
            <LazyImage
              src="/images/logo.png"
              alt="WisFile Logo"
              width={107}
              height={107}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col gap-12 md:gap-16 mb-16 md:mb-20 px-4 md:px-0 w-full max-w-5xl">
        {/* Feature 1: Sensitive Information Eradication */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-1 justify-center order-1 md:order-1 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-right"
          >
            <div className="w-full md:max-w-none bg-[#FFD36A] rounded-lg p-8 min-h-[300px] flex items-center justify-center">
              <Remover001 className="w-full h-auto max-w-[280px]" />
            </div>
          </div>
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-2"
            data-aos="zoom-out"
          >
            <h2 className="mb-4 font-bold text-lg md:text-xl">
              Sensitive Information Eradication
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              Automatically identifies and removes sensitive or personal
              metadata embedded in documents, such as author names, creation
              dates, and software versions.
            </p>
            <button
              onClick={scrollToTop}
              className="shadow-md font-semibold text-gray-900 transition"
              style={{
                width: "199px",
                height: "62px",
                background: "#F9D37A",
                borderRadius: "32px",
              }}
            >
              Try Now
            </button>
          </div>
        </div>

        {/* Feature 2: Enhanced Anonymity */}
        <div className="flex md:flex-row-reverse flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-col flex-1 items-start order-2"
            data-aos="zoom-out"
          >
            <h2 className="mb-4 font-bold text-lg md:text-xl">
              Enhanced Anonymity
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              This feature is particularly useful for users who want to maintain
              anonymity when sharing files (e.g., academic papers, business
              proposals, ensuring content is evaluated without bias).
            </p>
            <button
              onClick={scrollToTop}
              className="shadow-md font-semibold text-gray-900 transition"
              style={{
                width: "199px",
                height: "62px",
                background: "#F9D37A",
                borderRadius: "32px",
              }}
            >
              Try Now
            </button>
          </div>
          <div
            className="flex flex-1 justify-center order-1 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-right"
          >
            <div className="w-full md:max-w-none bg-[#FFD36A] rounded-lg p-8 min-h-[300px] flex items-center justify-center">
              <Remover002 className="w-full h-auto max-w-[280px]" />
            </div>
          </div>
        </div>

        {/* Feature 3: Supports Unbiased Review */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-1 justify-center order-1 md:order-1 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-right"
          >
            <div className="w-full md:max-w-none bg-[#FFD36A] rounded-lg p-8 min-h-[300px] flex items-center justify-center">
              <Remover003 className="w-full h-auto max-w-[280px]" />
            </div>
          </div>
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-2"
            data-aos="zoom-out"
          >
            <h2 className="mb-4 font-bold text-lg md:text-xl">
              Supports Unbiased Review
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              For academic or professional submissions, removing metadata
              ensures reviewers focus solely on the content itself, preventing
              potential biases based on the author&apos;s background.
            </p>
            <button
              onClick={scrollToTop}
              className="shadow-md font-semibold text-gray-900 transition"
              style={{
                width: "199px",
                height: "62px",
                background: "#F9D37A",
                borderRadius: "32px",
              }}
            >
              Try Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
