"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { renameActions } from "@/store/slice/rename";
import { FileItem } from "@/models/file";
import { API_FIL_PARSE, API_FIL_RENAME } from "@/api/path";

interface FileContextType {
  files: File[];
  addFiles: (files: File[]) => void;
  removeFile: (fileName: string) => void;
  clearFiles: () => void;
  getFormData: () => FormData;
  updateFile: (file: FileItem) => void;
  parseAndRenameFile: (file: File) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch();

  const addFiles = useCallback(
    (newFiles: File[]) => {
      console.log("============", newFiles, files);

      setFiles([...newFiles]);

      const filesMetadata: FileItem[] = newFiles.map((file) => ({
        ...file,
        status: "pending",
        name: file.name,
      })) as FileItem[];

      dispatch(renameActions.addFiles(filesMetadata));
    },
    [dispatch, files]
  );

  const removeFile = useCallback(
    (fileName: string) => {
      setFiles((prev) => prev.filter((file) => file.name !== fileName));

      dispatch(renameActions.removeFile({ name: fileName } as FileItem));
    },
    [dispatch]
  );

  const updateFile = useCallback(
    (file: FileItem) => {
      setFiles((prev) =>
        prev.map((f) => (f.name === file.name ? { ...f, ...file } : f))
      );
      dispatch(renameActions.updateFile(file));
    },
    [dispatch]
  );

  const clearFiles = useCallback(() => {
    setFiles([]);
    dispatch(renameActions.clearFiles());
  }, [dispatch]);

  const getFormData = useCallback(() => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    return formData;
  }, [files]);

  const parseAndRenameFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const parseRes = await fetch(API_FIL_PARSE, {
        method: "POST",
        body: formData,
      });

      if (parseRes.ok) {
        const parseResData = await parseRes.json();

        const renameRes = await fetch(API_FIL_RENAME, {
          method: "POST",
          body: JSON.stringify({
            old_name: file.name,
            content: parseResData.data,
          }),
        });
        if (renameRes.ok) {
          const renameResData = await renameRes.json();
          console.log("File renamed successfully:", renameRes);
          const f: FileItem = {
            name: file.name,
            newName: renameResData.data.new_name,
            status: "succeed" as const,
          };
          updateFile(f);
        }
      } else {
        const parseResData = await parseRes.json();
        console.log("File parsing failed:", parseRes);
        const f = {
          name: file.name,
          status: "failed" as const,
          error: parseResData.message,
        };
        updateFile(f);
      }
    } catch (error) {
      console.log("Error parsing file:", error);

      return {
        name: file.name,
        status: "error" as const,
        error: (error as Error).message,
      } as FileItem;
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        addFiles,
        removeFile,
        clearFiles,
        getFormData,
        updateFile,
        parseAndRenameFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
}
