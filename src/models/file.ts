export interface FileItem {
  name: string;
  status: "pending" | "processing" | "failed" | "error" | "succeed";
  error?: string;
  newName?: string;
}
