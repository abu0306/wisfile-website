import React, { useState, useRef } from "react";
import UploadIcon from "@/assets/svg/upload.svg";
import TruncatedText from "../TruncatedText";
import DelIcon from "@/assets/svg/delete.svg";
import { cloneDeep } from "lodash";
import { useFiles } from "@/contexts/FileContext";
import { logEvent } from "@/utils/eventLogger";

interface FileUploaderProps {
  onFilesSelected?: (files: File[]) => void;
  acceptedFileTypes?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  acceptedFileTypes = ".pdf,.doc,.docx,.png,.jpeg,.jpg",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [more, setMore] = useState(false);
  const { files: ufs } = useFiles();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setMore(false);
    const acceptedTypes = acceptedFileTypes
      .split(",")
      .map((type) => type.trim());
    const filteredFiles = files.filter((file) => {
      console.log(`Processing file: ${file.name}-fileType: ${file.type}`);
      const fileType = file.name.split(".").pop()?.toLowerCase();
      return fileType && acceptedTypes.includes(`.${fileType}`);
    });

    if (filteredFiles.length === 0) {
      alert("We support only PDF, doc, docx, png, jpeg and jpg formats.");
      return;
    }

    logEvent("file_upload", {
      file_count: filteredFiles.length,
    });

    if (onFilesSelected) {
      if (more) {
        let f = cloneDeep([...ufs, ...files]);
        if (f.length > 10) {
          f = f.slice(0, 10);
        }
        setFiles(f);
        onFilesSelected(f);
        return;
      }
      let f = cloneDeep([...files]);
      if (f.length > 10) {
        f = f.slice(0, 10);
      }
      setFiles(f);
      onFilesSelected(f);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFileTypes}
        multiple={true}
        onChange={handleFileInput}
      />
      {files.length === 0 && (
        <div
          className={`flex flex-col items-center bg-white [box-shadow:0px_37px_60px_-50px_#FFE0B4] mt-[30px] md:mt-[50px] rounded-[20px] md:rounded-[24px] cursor-pointer transition-all h-[280px] md:h-[360px] pt-[20px] md:pt-[30px] mx-4 md:mx-0
        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col justify-center items-center px-4 md:px-0">
            <UploadIcon className="w-16 md:w-auto h-16 md:h-auto" />
            <div className="mt-[12px] md:mt-[16px] px-2 md:px-0 text-[#999] text-[24px] md:text-[32px] text-center whitespace-pre-wrap">{`Upload Files \n PDF, doc, docx, png, jpeg and jpg here.`}</div>
            <div className="mt-[12px] md:mt-[16px] text-[#999] text-[14px] md:text-[16px]">
              At most 10 files
            </div>
          </div>
        </div>
      )}
      {files.length > 0 && (
        <div className="flex flex-col bg-white [box-shadow:0px_37px_60px_-50px_#FFE0B4] mx-4 md:mx-0 mt-[30px] md:mt-[50px] pt-3 pb-[20px] md:pb-[24px] rounded-[20px] md:rounded-[24px]">
          <div className="flex flex-col gap-1 px-[16px] md:px-[24px] py-[4px] max-h-[300px] md:max-h-[400px] overflow-y-auto">
            {files.map((file, idx) => (
              <div
                key={file.name}
                className={`flex items-center gap-1 justify-between py-[6px] md:py-[8px] border-[#EBEBEB] ${
                  idx !== files.length - 1 ? "border-b-[1px]" : ""
                }`}
              >
                <TruncatedText
                  title={file.name}
                  className="text-sm md:text-base"
                >
                  {file.name}
                </TruncatedText>
                <div>
                  <DelIcon
                    onClick={() => {
                      if (onFilesSelected) {
                        const newFiles = files.filter(
                          (f) => f.name !== file.name
                        );
                        setFiles(newFiles);
                        onFilesSelected(newFiles);
                      }
                    }}
                    className="flex-shrink-0 w-[12px] h-[12px] text-[#AAAAAC] cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
          {files.length < 10 && (
            <div
              onClick={() => {
                openFileDialog();
                setMore(true);
              }}
              className="flex justify-center mt-[20px] md:mt-[30px] font-bold text-[#FFB952] text-[20px] md:text-[28px] cursor-pointer"
            >
              {"Upload More"}
            </div>
          )}
          {files.length >= 10 && (
            <div className="flex justify-center mt-[20px] md:mt-[28px] px-4 md:px-0 font-bold text-[#999] text-[16px] md:text-[28px]">
              {"You have reached the maximum number of files."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
